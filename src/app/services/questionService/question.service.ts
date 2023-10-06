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

  getQuestionsAndAnswers(user_id: string, categoryid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.questionsDataStoreid,
      "Operation": "read",
      "Data": `select cast(al.answerid as text), al.answer, al.istrue, cast(q.questionid as text), cast(q.examid as text),cast(q.ecategoryid as text), q.question from questions_27_09 q left join answers_last al on al.questionid  = q.questionid left join (select us.user_id, us.question_id from user_score us where us.user_id = '${user_id}') us on us.question_id  = q.questionid where us.question_id is null and ecategoryid = '${categoryid}' order by q."number" asc limit 50`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
  //      "Data": `select cast(question_27_09.questionid as text), cast(question_27_09.examid as text), cast(question_27_09.ecategoryid as text), question_27_09.question, answers_last.answer, answers_last.istrue, cast(answers_last.answerid as text) from question_27_09 inner join answers_last on question_27_09.questionid=answers_last.questionid LEFT JOIN user_score ON question_27_09.questionid = user_score.question_id WHERE user_score.question_id order by (questions_27_09.number)`,

  getQuestionsAndAnswersByCategoryId(category_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.questionsDataStoreid,
      "Operation": "read",
      "Data": `WITH updated_questions AS ( UPDATE questions SET issolved = true WHERE questionid IN (SELECT questionid FROM questions WHERE issolved = false LIMIT 10) RETURNING *) select CAST(updated_questions.questionid AS TEXT), CAST(updated_questions.examid AS TEXT), CAST(updated_questions.ecategoryid AS TEXT), updated_questions.question, cast(answers_last.answerid as text), answers_last.answer, answers_last.istrue FROM updated_questions INNER JOIN answers_last on answers_last.questionid = updated_questions.questionid`,
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
