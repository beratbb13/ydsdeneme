import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/constants/Endpoints';
import { BehaviorSubject, map, Observable } from 'rxjs'
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
  answers = this.answerData.asObservable()

  insertAnswer(insertAnswer: answer) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.answersDataStoreid,
      "Operation": "insert",
      "Data": `Insert Into answers_last(answerid, questionid, trueanswer, answertext) VALUES('${insertAnswer.answerid}', '${insertAnswer.questionid}', '${insertAnswer.trueanswer}', '${insertAnswer.answertext}')`,
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
      "Data": `Update answers_last set answerid = '${updateAnswer.answerid}', questionid = '${updateAnswer.questionid}', trueanswer = '${updateAnswer.trueanswer}', answertext = '${updateAnswer.answertext}')`,
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
      "Data": `Select cast(answerid as text), cast(questionid as text), answertext, trueanswer from answers_last`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        //this.answerData.next(response.message)
        console.log(response.message);
        return response.message;
      })
    );
  }

  getAnswersByQuestionId(questionid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.answersDataStoreid,
      "Operation": "read",
      "Data": `select cast(al.questionid as text), q.question, cast(al.answerid as text), al.answertext, al.trueanswer from answers_last al inner join questions q on q.questionid = al.questionid  where al.questionid = '${questionid}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }
}
