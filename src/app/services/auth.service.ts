import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { appConfig } from '../appModels/api-config';
import { AuthResponse } from '../appInterface/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  
  signUp(email:string,password:string) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${appConfig.API_KEY}`, {
      email:email,
      password: password,
      returnSecureToken: true
    });
  }
  signIn(email:string,password:string) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${appConfig.API_KEY}`, {
      email:email,
      password: password,
      returnSecureToken: true
    });
  }
}
