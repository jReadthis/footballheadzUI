import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Owner } from './owners/owner';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  getResult: any = {};
  BASE_URL =
    'https://5rjfxlz8l6.execute-api.us-east-1.amazonaws.com/devl/owner';
  constructor(private httpClient: HttpClient) {}

  public getOwners(): Observable<HttpResponse<Owner[]>> {
    return this.httpClient
      .get<Owner[]>(this.BASE_URL, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  doGet() {
    debugger;
    this.httpClient.get(this.BASE_URL, {}).subscribe(
      (res) => {
        debugger;
        this.getResult = res;
      },
      (err) => {
        debugger;
        console.log('Error occured: ' + err.message);
      }
    );
  }

  public getOwner(ownerName: string) {
    return this.httpClient.get<Owner[]>(this.BASE_URL + `/${ownerName}`);
  }

  public addOwner(owner: Owner) {
    return this.httpClient.post(this.BASE_URL, owner);
  }

  public deleteOwner(ownerName: string) {
    const url = this.BASE_URL + `/${ownerName}`;
    return this.httpClient.delete(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
