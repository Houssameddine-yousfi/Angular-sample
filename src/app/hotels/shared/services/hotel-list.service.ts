import { Injectable } from "@angular/core";
import { IHotel } from "../models/hotel";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HotelListService {

  private readonly HOTEL_API_URL = '/api/hotels';

  constructor(private http: HttpClient){

  }

  public getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
      tap(hotels => console.log('hotels: ', hotels)),
      catchError(this.handleError)
    );
  }

  public getHotelById(id : number): Observable<IHotel | undefined> {
    const url = `${this.HOTEL_API_URL}/${id}`;
    return this.http.get<IHotel>(url).pipe(
      catchError(this.handleError)
    );
  }

  public createHotel(hotel:IHotel): Observable<IHotel> {

    hotel= {
      ...hotel,
      imageUrl : 'assets/img/hotel_default_img.avif',
      id: null
    }

    return this.http.post<IHotel>(this.HOTEL_API_URL,hotel).pipe(
      catchError(this.handleError)
    );
  }

  public updateHotel(hotel: IHotel): Observable<IHotel> {
    const url =  `${this.HOTEL_API_URL}/${hotel.id}`;
    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleError)
    )
  }

  public deleteHotel(hotelId :  number): Observable<{}> {
    const url = `${this.HOTEL_API_URL}/${hotelId}`;
    return this.http.delete<IHotel>(url).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      errorMessage = `Ann error occured: ${error.error}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'
    + '\n' + errorMessage));
  }

}
