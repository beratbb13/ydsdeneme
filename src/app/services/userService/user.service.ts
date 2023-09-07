import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../models/user'
import { Endpoints } from 'src/app/constants/Endpoints';
import { BehaviorSubject, map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  users: BehaviorSubject<user[]> = new BehaviorSubject<user[]>([]);

  insertUser(insertUser: user) {
    const body = {
      "DataStoreId": Endpoints,
      "Operation": "insert",
      "Data": `Insert Into`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    );
  }

  getUsers() {
    const body = {
      "DataStoreId": Endpoints,
      "Operation": "insert",
      "Data": `Insert Into`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        this.users.next(response.message)
        return response.message
      })
    );
  }
}
