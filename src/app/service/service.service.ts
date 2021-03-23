import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError'
import { catchError, map, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private REST_API_SERVER = 'http://202.182.111.45:8081/v1'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  public login(data: Object): Observable<object> {
    const url = this.REST_API_SERVER + '/auth/login';
    return this.httpClient.post<object>(url,data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getInfo (): Observable<any>{
    const url = this.REST_API_SERVER + '/accounts';
    return this.httpClient
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public createAccount(data: Object): Observable<object> {
    const url = this.REST_API_SERVER + '/accounts';
    return this.httpClient.post<object>(url,data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public updateAccount(data: any): Observable<object> {
    const url = this.REST_API_SERVER + '/account/' + data.account_number;
    return this.httpClient.put<object>(url,data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteAccount(id: number): Observable<{}> {
    const url = this.REST_API_SERVER + '/account/' + id;
    return this.httpClient.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
