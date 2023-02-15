import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  endpoint: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return !!localStorage.getItem('auth-token');
  }

  logIn(body: any) {
    return this.http.post(this.endpoint + '/api/user/login', body);
  }

  register(body: any) {
    return this.http.post(this.endpoint + '/api/user/register', body);
  }
}
