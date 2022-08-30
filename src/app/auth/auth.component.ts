import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';
import { AuthResponse } from '../appInterface/auth-interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode:boolean = true;
  form!: FormGroup;
  errorMessage!:string;
  errorMsgDescription = {
    UNKNOWN: "An unknown error occured",
    TOKEN_EXPIRED: "The user's credential is no longer valid. The user must sign in again.",
    EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted.",
    INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
    USER_DISABLED: "The user account has been disabled by an administrator.",
    USER_NOT_FOUND: "The user corresponding to the refresh token was not found. It is likely the user was deleted.",
    INVALID_REFRESH_TOKEN: "An invalid refresh token is provided.",
    INVALID_GRANT_TYPE: "the grant type specified is invalid.",
    MISSING_REFRESH_TOKEN: "no refresh token provided.",
    EMAIL_EXISTS: "The email address is already in use by another account.",
    OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later."
  }
  constructor(private fb:FormBuilder, private authservice:AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  } 
  onSubmit() {
    if(this.form.valid) {
      console.log(this.form.value);
      let email = this.form.value.email;
      let password = this.form.value.password;
      let response: Observable<AuthResponse>;
      if(this.loginMode) {
        response = this.authservice.signIn(email,password);
      } else {
        response = this.authservice.signUp(email,password);
      }
      response.pipe().subscribe({
        next: (res)  => {
          console.log(res)
        },
        error: (err) => {
          this.errorMessage = this.errorMsgDescription[err.error.error.message as keyof typeof this.errorMsgDescription]
          if(!this.errorMessage) {
            this.errorMessage = this.errorMsgDescription[err.error.error.message as keyof typeof this.errorMsgDescription]
          }
        } 
      });
    } else {
      // if invalid
    }
    
  }
}
