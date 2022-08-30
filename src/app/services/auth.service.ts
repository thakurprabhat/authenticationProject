import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { appConfig } from '../appModels/api-config';
import { AuthResponse } from '../appInterface/auth-interface';
import { pipe, Subject,tap } from 'rxjs';
import { User } from '../appModels/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>()
  constructor(private http:HttpClient) { }
  
  signUp(email:string,password:string) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${appConfig.API_KEY}`, {
      email:email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap((res) => {
        this.authenticateUser(res.email,res.localId,res.idToken,+res.expiresIn)
      })
    );
  }
  signIn(email:string,password:string) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${appConfig.API_KEY}`, {
      email:email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(res => {
        this.authenticateUser(res.email, res.localId,res.idToken,+res.expiresIn)
      })
    )
  }

  authenticateUser(email:string,id:string,token:string,expireIn:number) {
    const expirationDate = new Date(new Date().getTime()+ expireIn*1000);
    const user = new User(email,id,token,expirationDate);
    console.log("user =>",user);
    this.user.next(user);
  }
}
