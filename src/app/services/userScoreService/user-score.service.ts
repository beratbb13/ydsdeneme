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

  getUserScore(userid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "read",
      "Data": `select cast(user_id as text) from user_score`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }

  getUserScoreByDate(userid: string, date: string) {
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

  insertUserScore(scores: any[]) {
    let scoreBody: any = ''
    scores.map((score: any, indis: number) => {
      if (scores[indis + 1]) {
        scoreBody += `('${score.user_id}', '${score.question_id}'), `
      } else {
        scoreBody += `('${score.user_id}', '${score.question_id}')`
      }
    })

    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "insert",
      "Data": `insert into user_score(user_id, question_id) values${scoreBody}`,
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

  insertExamScore(user_id: string, questions: any[]) {

    /*questions.map(ques => {
      if (ques.istrue && ques.istrue == true)
        console.log('true', ques.question)
      else if (ques.istrue && ques.istrue == false)
        console.log('yanlis', ques)
      else
        console.log('bos', ques)  
    })*/

    let scoreBody: string = ''
    questions.map((ques: any, indis: number) => {
      if (questions[indis + 1]) {
        if (ques.istrue && ques.istrue == true)
          scoreBody += `('${user_id}', '${ques.question.questionid}', '${ques.question.examid}', '1'),`
        else if (ques.istrue && ques.istrue == false)
          scoreBody += `('${user_id}', '${ques.question.questionid}', '${ques.question.examid}', '0'),`
        else
          scoreBody += `('${user_id}', '${ques.question.questionid}', '${ques.question.examid}', '0'),`
      } else {
        if (ques.istrue && ques.istrue == true)
          scoreBody += `('${user_id}', '${ques.question.questionid}', '${ques.question.examid}', '1')`
        else if (ques.istrue && ques.istrue == false)
          scoreBody += `('${user_id}', '${ques.question.questionid}', '${ques.question.examid}', '0')`
        else
          scoreBody += `('${user_id}', '${ques.question.questionid}', '${ques.question.examid}', '0')`
      }
    })

    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "insert",
      "Data": `insert into user_score(user_id, question_id, examid, istrue) values${scoreBody}`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    )
  }

  getScoreByUserId(userId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "insert",
      "Data": `select examid, SUM(istrue) AS dogru_cevap_sayisi, COUNT(examid) AS toplam_soru_sayisi, (SUM(istrue) * 100.0 / COUNT(examid)) AS performans_yuzdesi FROM user_score where user_id = '${userId}' GROUP BY examid`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    )
  }
}
