import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Endpoints } from 'src/app/constants/Endpoints';
import { LoginRequest } from 'src/app/models/login';
import { RegisterUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  selectedButton: string | null = null;

  setSelectedButton(buttonName: string) {
    this.selectedButton = buttonName;
  }

  getSelectedButton() {
    return this.selectedButton;
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getToken() {
    // return localStorage.getItem('token');
    return "63436373258483285215"
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getUserUUID() {
    return localStorage.getItem('currentUser');
  }

  setUserUUID(userid: string) {
    localStorage.setItem('currentUser', userid);
  }

  getName() {
    let name = JSON.parse(localStorage.getItem('user')!);
    if (name.firstName && name.lastName) {
      return name.firstName + ' ' + name.lastName;
    }
    return ''
  }


  isAdmin() {
    var roles: any[] = this.getUserRoles()
    return roles.includes('Admin')
  }


  getUserRoles() {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user.roles) {
      return user.roles;
    } else return [];
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(Endpoints.login, loginRequest).pipe(
      map((response: any) => {
        this.setStorage(response.message)
        return response;
      })
    );
  }

  setStorage(response: any) {
    localStorage.setItem('user',response)
    this.setToken(response.token)
  }

  register(user: RegisterUser) {
    return this.http.post(Endpoints.register, user).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getLogout() {
    let param = {
      Token: this.getToken(),
    };
    return this.http.post(Endpoints.logout, param).pipe(
      map((response: any) => {
        this.loggedIn.next(false);
        this.router.navigate(['/']);
        localStorage.removeItem('userUUID')
        return response;
      })
    );
  }

  getUserLanguage() {
    let user = this.getUser();
    let lang = 'en';
    if (user) {
      if (user.language == 'Turkish') {
        lang = 'tr';
      }
    }
    return lang;
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

}
