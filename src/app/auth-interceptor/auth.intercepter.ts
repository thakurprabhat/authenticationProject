import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor( private authService: AuthService ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if(user) {
                    const modifiedReq = req.clone({
                        params: new HttpParams().set('auth',user.token)
                    });         
                    return next.handle(modifiedReq);
                }
                return next.handle(req);
            })
        )
    }

}