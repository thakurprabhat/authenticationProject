import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
      response.subscribe({
        next(res) {
          console.log(res)
        },
        error(err) {
          console.log(err);
        },
      });
    } else {
      // if invalid
    }
    
  }
}
