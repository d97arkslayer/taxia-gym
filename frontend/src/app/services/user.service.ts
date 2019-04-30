import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //url = 'http://127.0.0.1:3333';
  url = '';
  constructor(private __http: HttpClient) { }

  signUp(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.__http.post(`${this.url}/user/register`, body, httpOptions);
  }

  signIn(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.__http.post(`${this.url}/api/v1/user/login`, body, httpOptions);
  }
}
