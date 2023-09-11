import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { question } from '../../models/question'
import { Endpoints } from 'src/app/constants/Endpoints';
import { BehaviorSubject, map } from 'rxjs'
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken()
  questionData: BehaviorSubject<question[]> = new BehaviorSubject<question[]>([]);
  questions = this.questionData.asObservable()


  getExams() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examsDataStoreid,
      "Operation": "read",
      "Data": `select * from exams`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
        return response
      })
    );
  }

  getExamById(examid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examsDataStoreid,
      "Operation": "read",
      "Data": `select * from exams where examid = '${examid}'`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
        return response
      })
    );
  }

}
