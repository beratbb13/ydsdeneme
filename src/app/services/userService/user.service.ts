import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../models/user'
import { Endpoints } from 'src/app/constants/Endpoints';
import { map } from 'rxjs'
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken()

  insertUser(insertUser: user) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "insert",
      "Data": `Insert Into users(user_name, name_, surname_, password_, email_, phone_number, birth_date) VALUES('${insertUser.username}', '${insertUser.name}', '${insertUser.surname}', '${insertUser.password}', '${insertUser.email}', '${insertUser.phonenumber}', '${insertUser.birthdate}')`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  updateUser(updateUser: user) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "update",
      "Data": `Update users set user_name = '${updateUser.username}', name_ = '${updateUser.name}', surname_ = '${updateUser.surname}', password_ = '${updateUser.password}', email_ = '${updateUser.email}', phone_number = '${updateUser.phonenumber}', birth_date = '${updateUser.birthdate}'`,
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
