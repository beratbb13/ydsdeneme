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
      "Data": `Update questions set questionid = '${updateQuestion.questionid}', examid = '${updateQuestion.examid}', ecategoryid = '${updateQuestion.ecategoryid}', question = '${updateQuestion.question}'`,
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
      "Data": `Select cast(questionid as text), cast(examid as text), cast (ecategoryid as text), question from questions`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getQuestionsAndAnswers() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.questionsDataStoreid,
      "Operation": "read",
      "Data": `select cast(questions.questionid as text), cast(questions.examid as text), cast(questions.ecategoryid as text), questions.question, answers_last.answer, answers_last.istrue, cast(answers_last.answerid as text) from questions inner join answers_last on questions.questionid=answers_last.questionid`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getQuestionsAndAnswersByCategoryId(category_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.questionsDataStoreid,
      "Operation": "read",
      "Data": `select cast(questions.questionid as text), cast(questions.examid as text), cast(questions.ecategoryid as text), questions.question, answers_last.answer, answers_last.istrue, cast(answers_last.answerid as text) from questions inner join answers_last on questions.questionid=answers_last.questionid LEFT JOIN user_score ON questions.questionid = user_score.question_id WHERE user_score.question_id IS NULL LIMIT 50`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response.message)
        return response.message
      })
    );
  }

  getQuestionsByCategoryId(categoryId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.questionsDataStoreid,
      "Operation": "read",
      "Data": `Select cast(questionid as text), cast(examid as text), cast (ecategoryid as text), question from questions where ecategoryid = '${categoryId}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getRandomQuestionsByCategoryId(categoryId: string, limit: number) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.questionsDataStoreid,
      "Operation": "read",
      "Data": `Select cast(questionid as text), cast(examid as text), cast (ecategoryid as text), question from questions where ecategoryid = '${categoryId}' limit ${limit}`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response.message);
        return response.message
      })
    );
  }
}
