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
      "Data": `select cast(userid as text) from user_score`,
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
      "Data": `select cast(userid as text), cast(questionid as text) from user_score`,
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
      scoreBody += `('${score.user_id}', '${score.exam_id}', '${score.category_id}','${score.question_id}')`
      if (scores[indis + 1])
        scoreBody += ','
    })

    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "insert",
      "Data": `insert into user_score(userid, examid, categoryid, questionid) values${scoreBody}`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateUserScore(score: any) {
    console.log(score)
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "update",
      "Data": `update user_score set trueanswer= '${score.trueanswer}', createdate='now()' where userid='${score.userid}' and examid = '${score.examid}' and categoryid='${score.categoryid}' and questionid = '${score.questionid}'`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
        return response.message
      })
    );
  }

  insertExamScore(query: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "insert",
      "Data": `insert into user_score(userid, examid, categoryid, questionid, trueanswer, createdate) values${query}`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
        return response
      })
    )
  }

  getScoreByUserId(userId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "insert",
      "Data": `select examid, SUM(trueanswer) AS dogru_cevap_sayisi, COUNT(examid) AS toplam_soru_sayisi, (SUM(trueanswer) * 100.0 / COUNT(examid)) AS performans_yuzdesi FROM user_score where userid = '${userId}' GROUP BY examid`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    )
  }

  getExamScoresByUserId(user_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "read",
      "Data": `with sonuc as ( select us.userid, us.categoryid, ec."Name", us.questionid, us.trueanswer, us.createdate from user_score us inner join exam_categories ec on ec.ecategoryid = us.categoryid where us.userid = '${user_id}') select s."Name" as category_name, cast(s.categoryid as text), COUNT(case when s.trueanswer = true then 1 else null end) as dogru_sayisi, COUNT(case when s.trueanswer = false then 1 else null end) as yanlis_sayisi, COUNT(s.trueanswer) as soru_sayisi, (COUNT(case when s.trueanswer = true then 1 else null end)::double precision / COUNT(s.trueanswer) * 100) as performans_orani from sonuc s group by s."Name", s.categoryid`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
        return response.message
      })
    )
  }

  getExamScoresByUserIdAndDate(user_id: string, date: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "read",
      "Data": `with sonuc as ( select us.userid, us.categoryid, ec."Name", us.questionid, us.trueanswer, us.createdate from user_score us inner join exam_categories ec on ec.ecategoryid = us.categoryid where us.userid = '${user_id}') select s."Name" as category_name, cast(s.categoryid as text), COUNT(case when s.trueanswer = true then 1 else null end) as dogru_sayisi, COUNT(case when s.trueanswer = false then 1 else null end) as yanlis_sayisi, COUNT(s.trueanswer) as soru_sayisi, (COUNT(case when s.trueanswer = true then 1 else null end)::double precision / COUNT(s.trueanswer) * 100) as performans_orani from sonuc s where s.createdate = '${date}' group by s."Name", s.categoryid`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
        return response.message
      })
    )
  }

  getGeneralResultsByUserIdAndCategoryId(user_id: string, category_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "read",
      "Data": `with sonuc as ( select us.userid, us.categoryid, ec."Name", us.questionid, us.trueanswer, us.createdate from user_score us inner join exam_categories ec on ec.ecategoryid = us.categoryid where us.userid = '${user_id}') select s."Name" as category_name, cast(s.categoryid as text), COUNT(case when s.trueanswer = true then 1 else null end) as dogru_sayisi, COUNT(case when s.trueanswer = false then 1 else null end) as yanlis_sayisi, COUNT(s.trueanswer) as soru_sayisi, (COUNT(case when s.trueanswer = true then 1 else null end)::double precision / COUNT(s.trueanswer) * 100) as performans_orani from sonuc s where s.categoryid = '${category_id}' group by s."Name", s.categoryid`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response.message[0])
        return response.message[0]
      })
    )
  }
}
