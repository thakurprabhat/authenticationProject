import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
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
  constructor() { }

  handleError(err: HttpErrorResponse) {
    if(!this.errorMessage) {
      this.errorMessage = this.errorMsgDescription["UNKNOWN"];
    } else {
      this.errorMessage = this.errorMsgDescription[err.error.error.message as keyof typeof this.errorMsgDescription]
    }
    return this.errorMessage;
  }
}
