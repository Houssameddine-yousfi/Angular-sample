import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})

export class StarRatingComponent implements OnChanges{


  public starWidth: number = 3*125/5;
  @Input()
  public rating: number = 2;
  @Output()
  public starRatingClicked: EventEmitter<string> = new EventEmitter<string>() ;


  ngOnChanges(changes: SimpleChanges): void {
    this.starWidth = this.rating * 125 / 5;
  }

  public sendRating(): void {
    this.starRatingClicked.emit(`La note est de ${this.rating}`)
  }

}
