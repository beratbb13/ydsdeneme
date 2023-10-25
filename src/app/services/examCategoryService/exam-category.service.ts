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

  getCategories(examid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examCategoryDataStoreid,
      "Operation": "read",
      "Data": `select cast(ex.ecategoryid as text), cast(ex.parentid as text), cast(ex.examid as text), ex."Name", p.parent_name  from exam_categories ex left join parent p on p.parentid = ex.parentid  where ex.examid = '${examid}' order by ex.parentid asc`,
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

  getUsersCourse(user_id: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examCategoryDataStoreid,
      "Operation": "read",
      "Data": `select cast(e.examid as text), e.exam_name from users_course uc inner join exam e on e.examid = uc.examid where uc.userid = '${user_id}' group by e.examid, e.exam_name`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message[0];
      })
    );
  }
  getUsersExams(userid: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.examsDataStoreid,
      "Operation": "read",
      "Data": `SELECT DISTINCT uc.usercourseid, cast(ex.examid as text), ex.exam_name FROM exam ex INNER JOIN users_course uc ON ex.examid = uc.examid WHERE uc.userid = '${userid}'`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message[0];
      })
    );
  }

}
