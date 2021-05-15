import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Manager } from '../../model/manager';


@Injectable({
  providedIn: 'root'
})
export class ManagerCrudService {
  
  // REST API
  endpoint = 'http://managerapi-prod.eba-veaggmxz.us-east-1.elasticbeanstalk.com/v1';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };  

  getUsers(): Observable<Manager[]> {
    return this.httpClient.get<Manager[]>(this.endpoint + '/manager')
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  getTeams(managerName: string): Observable<Manager[]> {
    return this.httpClient.get<Manager[]>(this.endpoint + '/manager/', {
      params: {
        'managerName': managerName
      }})
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  getSingleUser(id: string): Observable<Manager> {
    return this.httpClient.get<Manager>(this.endpoint + '/manager/' + id)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }  

  addUser(manager: Manager): Observable<Manager> {
    return this.httpClient.post<Manager>(this.endpoint + '/manager', JSON.stringify(manager), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }  

  updateUser(id: string, data: any): Observable<Manager> {
    return this.httpClient.put<Manager>(this.endpoint + '/manager/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  deleteUser(managerName: string){
    return this.httpClient.delete<Manager>(this.endpoint + '/manager/' + managerName, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  processError(err: any) {
     let message = '';
     if(err.error instanceof ErrorEvent) {
      message = err.error.message;
     } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
     }
     console.log(message);
     return throwError(message);
  }

}
