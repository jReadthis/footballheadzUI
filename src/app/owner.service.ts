import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpClientModule,
} from '@angular/common/http';
import { Owner } from './owners/owner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  constructor(private httpClient: HttpClient) {}
  readonly BASE_URL =
    'https://5rjfxlz8l6.execute-api.us-east-1.amazonaws.com/prod/owner';

  public getOwners(): Observable<HttpResponse<Owner[]>> {
    return this.httpClient.get<Owner[]>(this.BASE_URL, { observe: 'response' });
  }

  public getOwner(ownerName: string) {
    return this.httpClient.get<Owner[]>(this.BASE_URL + `/${ownerName}`);
  }

  public addOwner(owner) {
    return this.httpClient.post(this.BASE_URL, owner);
  }

  public deleteOwner(ownerName: string) {
    const url = this.BASE_URL + `/${ownerName}`;
    return this.httpClient.delete(url);
  }
}
