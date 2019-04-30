import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  //url = 'http://127.0.0.1:3333';
  url = '';
  constructor(private __http: HttpClient) { }


  getEquipment() {
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    const httpOptions = {
      headers,
    };
    return this.__http.get(`${this.url}/api/v1/equipment`, httpOptions);
  }
}
