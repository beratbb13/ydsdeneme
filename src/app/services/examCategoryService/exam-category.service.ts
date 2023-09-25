import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/constants/Endpoints';
import { BehaviorSubject, map } from 'rxjs'
import { AuthService } from '../authService/auth.service';
import { exam } from '../../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamCategoryService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken()

  public examData: BehaviorSubject<exam[]> = new BehaviorSubject<exam[]>([]);
  exams = this.examData.asObservable();

  getCategories() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examCategoryDataStoreid,
      "Operation": "read",
      "Data": `select exam_categories.\"Name\", cast(ecategoryid as text), cast(parentid as text) from exam_categories`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  getExamCategories(examid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examCategoryDataStoreid,
      "Operation": "read",
      "Data": `select exam_categories.\"Name\", cast(ecategoryid as text) from exam_categories where ecategoryid = '${examid}'`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message[0];
      })
    );
  }

  getExamForCategories(category: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examCategoryDataStoreid,
      "Operation": "read",
      "Data": `select * from exam_categories where Name = '${category}'`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message[0];
      })
    );
  }
}
