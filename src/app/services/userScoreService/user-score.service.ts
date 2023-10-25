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

  insertExamScore(user_id: string, query: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "insert",
      "Data": `insert into user_score(user_id, question_id, examid, trueanswer, createdate) values${query}`,
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
      "Data": `select examid, SUM(trueanswer) AS dogru_cevap_sayisi, COUNT(examid) AS toplam_soru_sayisi, (SUM(trueanswer) * 100.0 / COUNT(examid)) AS performans_yuzdesi FROM user_score where user_id = '${userId}' GROUP BY examid`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    )
  }

  getExamScoresByUserId(userid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "read",
      "Data": `with sonuc as (select uc.userid, uc.categoryid, ec."Name", us.question_id, us.trueanswer, us.createdate from users_course uc inner join user_score us on us.user_id = uc.userid inner join exam_categories ec on ec.ecategoryid = uc.categoryid where us.user_id = '${userid}') select s."Name", COUNT(case when s.trueanswer = true then 1 else null end) as dogru_soru, COUNT(s.trueanswer) as toplam_soru, (COUNT(case when s.trueanswer = true then 1 else null end)::double precision / COUNT(s.trueanswer) * 100) as performans from sonuc s group by s."Name", s.categoryid`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
        return response.message
      })
    )
  }

  getExamScoresByUserIdAndDate(userid: string, date: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.userScoreDataStoreid,
      "Operation": "read",
      "Data": `with sonuc as (select uc.userid, uc.categoryid, ec."Name", us.question_id, us.trueanswer, us.createdate from users_course uc inner join user_score us on us.user_id = uc.userid inner join exam_categories ec on ec.ecategoryid = uc.categoryid where us.user_id = '${userid}' and us.createdate = '${date}' ) select s."Name", COUNT(case when s.trueanswer = true then 1 else null end) as dogru_soru, COUNT(s.trueanswer) as toplam_soru, (COUNT(case when s.trueanswer = true then 1 else null end)::double precision / COUNT(s.trueanswer) * 100) as performans from sonuc s group by s."Name", s.categoryid`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
        return response.message
      })
    )
  }
}
