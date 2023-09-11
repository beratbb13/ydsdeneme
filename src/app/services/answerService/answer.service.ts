import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/constants/Endpoints';
import { BehaviorSubject, map } from 'rxjs'
import { AuthService } from '../authService/auth.service';
import { answer } from 'src/app/models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken()
  answerData: BehaviorSubject<answer[]> = new BehaviorSubject<answer[]>([]);
  questions = this.answerData.asObservable()

  insertAnswer(insertAnswer: answer) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.answersDataStoreid,
      "Operation": "insert",
      "Data": `Insert Into answers(answerid, questionid, istrue, answer) VALUES('${insertAnswer.answerid}', '${insertAnswer.questionid}', '${insertAnswer.istrue}', '${insertAnswer.answertext}')`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }

  updateAnswer(updateAnswer: answer) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.answersDataStoreid,
      "Operation": "update",
      "Data": `Update answers set answerid = '${updateAnswer.answerid}', questionid = '${updateAnswer.questionid}', istrue = '${updateAnswer.istrue}', answer = '${updateAnswer.answertext}')`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }

  getAnswers() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.answersDataStoreid,
      "Operation": "read",
      "Data": `Select * from answers`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        this.answerData.next(response.message)
        return response.message
      })
    );
  }

}
