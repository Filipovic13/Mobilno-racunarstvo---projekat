/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered: boolean;
}

interface UserData {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isUserAuthenticated = false;
  private _user = new BehaviorSubject<User>(null); // gde se pretplatimo nad User-om, tu cemo imati u uvidu svaku promenu nad njim
  //BehaviotSubject aktivniji Observable, mi kontrolisemo pozivanje next metode, koja emituje event

  // pipe: presrecemo vr Observable-a
  //tap operator: pristupamo tim podacima i radimo nesto sa njima
  //pozivamo next metodu koja ce da setuje podatje User-a/ da ih emituje

  //nakon logIn-a i registacije potrebno je da setujemo tog juzera

  constructor(private http: HttpClient, private router: Router) {}

  get isUserAuthenticated() {
    return this._user.asObservable().pipe(
      //uzimamo juzera kao Observable
      map((user) => {
        // kroz map operator menjamo povratnu vr Observable-a...vraca boolean, a ne Observable
        if (user) {
          return !!user.token;
          //konverzija u boolean pomocu !!
          //token je string, prvi ! ce pretvoriti u boolean (u false)
          //drugi ! ce false prebaciti u true
        } else {
          //ukoliko ne postiji juzer -> nije autentifikovan
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  get userEmail() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.email;
        } else {
          return null;
        }
      })
    );
  }

  register(user: UserData) {
    this._isUserAuthenticated = true;

    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fireBaseAPIKey}`,
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this._user.next(user);
        })
      );
  }

  logIn(user: UserData) {
    this._isUserAuthenticated = true;

    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireBaseAPIKey}`,
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((userData) => {
          //presrecemo podatke koje dobijamo i cuvamo ih
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000 //trebaju nam milisekunde pa mnozimo za 1000
          );
          const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this._user.next(user); // setujemo juzera ( _user -> BehaviorSubject)
        })
      );
  }
  logOut() {
    console.log('Goodbye');
    this._user.next(null);
    //this.router.navigateByUrl('/log-in');
  }
}
