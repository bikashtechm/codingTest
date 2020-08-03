import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(private _httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    return this._httpClient.get(url);
  }

  postImages(url: string, model: any): Observable<any> {
    return this._httpClient.post(url, model);
  }

  post(url: string, model: any): Observable<any> {
    const body = JSON.stringify(model);
    return this._httpClient.post(url, body);
  }

  put(url: string, id: number, model: any): Observable<any> {
    const body = JSON.stringify(model);
    return this._httpClient.put(url + id, body);
  }
  delete(url: string, id: number): Observable<any> {
    return this._httpClient.delete(url + id);
  }
}
