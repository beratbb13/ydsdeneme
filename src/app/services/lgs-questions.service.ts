import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './authService/auth.service';
import { Endpoints } from '../constants/Endpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LgsQuestionsService {

  constructor(private http:HttpClient, private auth:AuthService) { }


  getQuestions() {
    const body = {
      "Token": this.auth.getToken(),
      "DataStoreId": Endpoints.lgsDataStoreId,
      "Operation": "read",
      "Data": `SELECT * FROM public.2020lgs_sorular`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }


}
