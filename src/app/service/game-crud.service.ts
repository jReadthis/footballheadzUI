import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Game } from 'src/model/game';
import { HeadToHead } from 'src/model/head2head';

@Injectable({
  providedIn: 'root'
})
export class GameCrudService {

  // REST API
  endpoint = 'http://Gameapi-prod.eba-4vpaptbt.us-east-1.elasticbeanstalk.com/v1'
  COMMA = ','

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  
  getGames() {
    return this.httpClient.get<Game[]>(this.endpoint + '/game')
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  getHeadToHeadRecord(team1: string, team2: string) {
    const teams = team1 + this.COMMA + team2
    return this.httpClient.get<HeadToHead>(this.endpoint + '/game/head2head',{
      params: {
        'teamName': teams,
      }})
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  getGame(id: any) {
    return this.httpClient.get<Game>(this.endpoint + '/game/' + id)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  deleteGame(id: string) {
    return this.httpClient.delete<Game>(this.endpoint + '/game/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  addGame(game: Game) {
    return this.httpClient.post<Game>(this.endpoint + '/game', JSON.stringify(game), this.httpOptions)
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
