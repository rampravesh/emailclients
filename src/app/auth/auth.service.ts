import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface IUsernameAvailableResponse {
  available: boolean
}

interface SignupCredential {
  username: string,
  password: string,
  passwordConfirmation: string
}

interface SignupResponse {
  username: string
}

interface SignedResponse {
  authenticated: boolean,
  username: string
}

interface SinginCredential {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = 'https://api.angular-email.com'
  signedIn$ = new BehaviorSubject(null)
  username: string;

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<IUsernameAvailableResponse>(`${this.baseURL}/auth/username`,
      this.usernamePayload(username))
  }


  usernamePayload(value: string) {
    return { username: value }
  }

  signUp(credential: SignupCredential) {
    return this.http.post<SignupResponse>(`${this.baseURL}/auth/signup`, credential)
      .pipe(tap((res) => {
        this.signedIn$.next(true);
        this.username = res.username;
      }
      ));
  }

  checkAuth() {
    return this.http.get<SignedResponse>(`${this.baseURL}/auth/signedin`).pipe(tap(({ authenticated, username }) => {
      this.signedIn$.next(authenticated)
      this.username = username;
    }))
  }

  signOut() {
    return this.http.post(`${this.baseURL}/auth/signout`, {})
      .pipe(tap(() => {
        this.signedIn$.next(false)
      }))
  }

  signIn(credential: SinginCredential) {
    return this.http.post<any>(`${this.baseURL}/auth/signin`, credential)
      .pipe(tap((res) => {
        this.signedIn$.next(true);
        this.username = res.username;
      }))
  }
}

