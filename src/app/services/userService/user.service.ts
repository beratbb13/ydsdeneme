import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Endpoints } from 'src/app/constants/Endpoints';
import { map } from 'rxjs'
import { AuthService } from '../authService/auth.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken()

  insertUser(insertUser: User) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "insert",
      "Data": `Insert Into users(user_name, name_, surname_, password_, email_, phone_number, birth_date) VALUES('${insertUser.user_name}', '${insertUser.name_}', '${insertUser.surname_}', '${insertUser.password_}', '${insertUser.email_}', '${insertUser.phone_number}', '${insertUser.birth_date}')`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  updateUser(updateUser: User) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "update",
      "Data": `Update users set user_name = '${updateUser.user_name}', name_ = '${updateUser.name_}', surname_ = '${updateUser.surname_}', password_ = '${updateUser.password_}', email_ = '${updateUser.email_}', phone_number = '${updateUser.phone_number}', birth_date = '${updateUser.birth_date}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }

  getUsers() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "read",
      "Data": `Select cast(user_id as text), user_name, name_, surname_, password_, email_, phone_number, birth_date from users`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }

  getUserByUserName(username: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "read",
      "Data": `Select cast(user_id as text), user_name, name_, surname_, password_, email_, phone_number, birth_date from users where user_name = '${username}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message[0]
      })
    )
  }

  deleteUser(username: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "update",
      "Data": `delete * from users where user_name = '${username}'`,
      "Encrypted": "1951"
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    )
  }
}
