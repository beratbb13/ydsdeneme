import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/constants/Endpoints';
import { AuthService } from '../authService/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamRegisterService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  token: string | null = this.authService.getToken()

  insertUser(insertUser:any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "insert",
      "Data": `Insert Into yds_registration(id,user_name) VALUES ('${insertUser.id}', '${insertUser.user_name}')`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getUsers() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "read",
      "Data": `Select * from yds_registration`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }
}
