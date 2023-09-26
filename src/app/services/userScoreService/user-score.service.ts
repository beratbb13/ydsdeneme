import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/constants/Endpoints';
import { BehaviorSubject, map } from 'rxjs'
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserScoreService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken();

  getUserScore() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "read",
      "Data": `select cast(user_id as text), cast(question_id as text) from user_score`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }

  insertUserScore(score: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "insert",
      "Data": `insert into user_score(user_id, question_id) values('${score.user_id}', '${score.question_id}')`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateUserScore(score: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "update",
      "Data": `update user_score set user_id='${score.user_id}', question_id='${score.question_id}'`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }
}
