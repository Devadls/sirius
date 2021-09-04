import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code ', error.status, 
        'body was: ', error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };


  getWeatherList(){
    return this.http
      .get('https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getDestinationList(){
    return this.http
      .get('https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


}
