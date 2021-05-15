import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Season } from '../../model/season';

@Injectable({
  providedIn: 'root'
})
export class SeasonCrudService {

  // REST API
  endpoint = 'http://Seasonapi-env.eba-2iwsumfh.us-east-1.elasticbeanstalk.com/v1';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

    getListSeasons(): Observable<Season[]> {
      return this.httpClient.get<Season[]>(this.endpoint + '/season')
      .pipe(
        retry(1),
        catchError(this.processError)
      )
    }

    getListSeasonsByYear(year: string): Observable<Season[]> {
      return this.httpClient.get<Season[]>(this.endpoint + '/season/',{
        params: {
          'year': year,
        }})
      .pipe(
        retry(1),
        catchError(this.processError)
      )
    }
  
    getSingleSeason(id: string): Observable<Season> {
      return this.httpClient.get<Season>(this.endpoint + '/season/' + id)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
    }  
  
    addSeason(season: Season): Observable<Season> {
      return this.httpClient.post<Season>(this.endpoint + '/season', JSON.stringify(season), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
    }  
  
    updateSeason(id: string, data: any): Observable<Season> {
      return this.httpClient.put<Season>(this.endpoint + '/season/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
    }
  
    deleteSeason(seasonName: string){
      return this.httpClient.delete<Season>(this.endpoint + '/season/' + seasonName, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
    }
  
    private processError(err: any) {
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
