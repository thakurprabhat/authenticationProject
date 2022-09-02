import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay, exhaustMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isUserlogin:boolean = false;
  constructor(private _authservice: AuthService, public http:HttpClient) { }

  ngOnInit(): void {
    this._authservice.user.pipe(
      take(1),
      exhaustMap( user => {
        delay(1000);
        return this.http.get("https://authangular-110-default-rtdb.firebaseio.com/quiz.json"
        // attached token for single api
        // , {
          // params: new HttpParams().set('auth',user.token)
        // }
        );
      })
    ).subscribe({
      next: (res) => {
        this.isUserlogin = !!res;
      } 
    })
  }

}
