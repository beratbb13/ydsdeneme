import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/constants/Endpoints';
import { BehaviorSubject, map } from 'rxjs'
import { AuthService } from '../authService/auth.service';
import { exam } from '../../models/exam';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken()

  public examData: BehaviorSubject<exam[]> = new BehaviorSubject<exam[]>([]);
  exams = this.examData.asObservable();

  getExam() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examsDataStoreid,
      "Operation": "read",
      "Data": `select cast(examid as text), Name, description, category from exam`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response);
        this.examData.next(response)
      })
    );
  }


  getExams() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examsDataStoreid,
      "Operation": "read",
      "Data": `select cast(examid as text), exam.\"Name\", description, category from exam`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    );
  }

  getExamById(examid: string): Observable<exam> {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examsDataStoreid,
      "Operation": "read",
      "Data": `select cast(examid as text), Name, description, category from exam where examid = '${examid}'`,
      "Encrypted": '1951'
    }
    return this.http.post<exam>(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
        return response
      })
    );
  }

}
