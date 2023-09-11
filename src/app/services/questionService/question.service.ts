import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { question } from '../../models/question'
import { Endpoints } from 'src/app/constants/Endpoints';
import { BehaviorSubject, map } from 'rxjs'
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken()
  questionData: BehaviorSubject<question[]> = new BehaviorSubject<question[]>([]);
  questions = this.questionData.asObservable()

  insertQuestion(insertQuestion: question) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.questionsDataStoreid,
      "Operation": "insert",
      "Data": `Insert Into questions(questionid, examid, ecategoryid, question) VALUES('${insertQuestion.questionid}', '${insertQuestion.examid}', '${insertQuestion.ecategoryid}', '${insertQuestion.question}')`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }

  updateQuestion(updateQuestion: question) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.questionsDataStoreid,
      "Operation": "update",
      "Data": `Update questions set questionid = '${updateQuestion.questionid}', examid = '${updateQuestion.examid}', ecategoryid = '${updateQuestion.ecategoryid}', question = '${updateQuestion.question}')`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }

  getQuestions() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.questionsDataStoreid,
      "Operation": "read",
      "Data": `Select cast(questionid as text), cast(examid as text), cast (ecategoryid as text), question question from questions`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
}
