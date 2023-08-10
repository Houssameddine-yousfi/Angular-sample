import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';
import { GlobalGenericValidator } from '../shared/validators/global-generic.validator';
import { EMPTY, Observable, debounce, debounceTime, fromEvent, merge, timer } from 'rxjs';
import { NumberValidator } from '../shared/validators/number.validator';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit{

  @ViewChildren(FormControlName,{read: ElementRef}) inputElements : ElementRef[] | undefined;


  public hotelForm: FormGroup ;
  public hotel: IHotel | undefined;
  public pageTitle : string = '';
  public errorMsg: string | null | undefined;
  private globalValidator: GlobalGenericValidator;
  public formErrors: {[key: string] : string} = {};
  private isFormSubmitted: boolean = false;

  private validationMessages: { [key: string]: { [key: string]: string; }; } = {
    hotelName: {
      required: 'Le nom de l\'hotel est obligatoire',
      minlength: 'Le nom de l\'hotel doit comporter plus de 3 charchtères'
    },
    price: {
      required: 'Le prix est obligatoire',
      pattern: 'Le prix doit etre un nombre'
    },
    rating: {
      range: 'Donnez une note comprise entre 1 et 5'
    }
  }

  constructor(
    private fb: FormBuilder,
    private root: ActivatedRoute,
    private router: Router,
    private hotelService: HotelListService
  ){
    this.globalValidator = new GlobalGenericValidator(this.validationMessages);

    this.hotelForm = this.fb.group({
      hotelName: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      rating: ['', NumberValidator.range(1,5)],
      description: [''],
      tags: this.fb.array([])
    })
  }
  ngAfterViewInit(): void {

    const formControlBlurs: Observable<unknown>[] = this.inputElements!
      .map((formControlElemRef: ElementRef) => fromEvent(formControlElemRef.nativeElement, 'blur'))

    merge(this.hotelForm.valueChanges, ...formControlBlurs)
    .pipe(
      debounceTime(800)
      //debounce(() => this.isFormSubmitted? EMPTY : timer(800))
    )
    .subscribe(() => {
      this.formErrors = this.globalValidator.createErrorMessage(this.hotelForm,this.isFormSubmitted);
      console.log('errors:', this.formErrors);
    })

  }

  ngOnInit(): void {

    this.root.paramMap.subscribe( params => {
      const id = (params.get('id'));

      //case param not found or id = 0
      if(id == null || +id == 0){
        this.pageTitle = 'Créer un hotel'
        this.hotel = this.getDefaultHotel()
        this.displayHotel(this.hotel);
        return;
      }

      // otherwise search for it
      this.getSelectedHotel(+id);
      this.pageTitle = 'modifier un hotel'
    })
  }



  public get tags(): FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTag(): void {
    this.tags.push(new FormControl());
  }

  public deleteTag(index: number): void{
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  public displayHotel(hotel: IHotel): void {
    this.hotel = hotel;

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description,
    })

    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []))
  }

  public getDefaultHotel(): IHotel{
    return {
      id: 0,
      hotelName: '',
      price: 0,
      rating: 0,
      description: '',
      imageUrl: ''
    };
  }

  public getSelectedHotel(id: number):void{

    this.hotelService.getHotelById(id).subscribe((hotel: IHotel | undefined) => {
      if(hotel == null){
        this.hotel = this.getDefaultHotel();
        return;
      }

      this.hotel = hotel;
      this.displayHotel( hotel);
    })
  }

  public hideError(): void {
    this.errorMsg = null;
  }

  public saveHotel(){
    this.isFormSubmitted=true;

    if(!this.hotelForm.valid){
      this.errorMsg = 'Corriger les erreurs du formulaire SVP';
      this.hotelForm.updateValueAndValidity({
        onlySelf: true,
        emitEvent: true
      })
      return;
    }

    if(!this.hotelForm.dirty)
      return;

    const hotel: IHotel = {
      ...this.hotel,
      ...this.hotelForm.value
    }

    if (hotel.id == 0) {
      this.hotelService.createHotel(hotel).subscribe({
        next: () => this.saveCompleted(),
        error: (err) => this.errorMsg = err
      })
    } else {
      this.hotelService.updateHotel(hotel).subscribe({
        next: () => this.saveCompleted(),
        error: (err) => this.errorMsg = err
      })
    }
    console.log( this.hotelForm.value)
  }

  public deleteHotel(){
    if(!confirm(`Do you want to delete ${this.hotel?.hotelName} ?`))
      return;

    if(this.hotel == undefined || this.hotel?.id === null)
      return;

    this.hotelService.deleteHotel(this.hotel.id).subscribe({
      next: () => this.saveCompleted()
    })
  }

  public saveCompleted(){
    this.hotelForm.reset();
    this.router.navigate(['/hotels']);
  }
}
