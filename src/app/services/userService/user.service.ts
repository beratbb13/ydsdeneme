import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Endpoints } from 'src/app/constants/Endpoints';
import { map } from 'rxjs'
import { AuthService } from '../authService/auth.service';
import { User } from 'src/app/models/user';
import { json } from 'body-parser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken()

  insertUser(insertUser: User) {
    const body = {
      "Token": this.authService.getToken(),
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "insert",
      "Data": `Insert Into users(user_name, name_, surname_, password_, email_, phone_number, birth_date,user_id) VALUES('${insertUser.user_name}', '${insertUser.name_}', '${insertUser.surname_}', '${insertUser.password_}', '${insertUser.email_}', '${insertUser.phone_number}', '${insertUser.birth_date}','${insertUser.user_id}')`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  updateUser(updateUser: User) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "update",
      "Data": `Update users set user_name = '${updateUser.user_name}', name_ = '${updateUser.name_}', surname_ = '${updateUser.surname_}', password_ = '${updateUser.password_}', email_ = '${updateUser.email_}', phone_number = '${updateUser.phone_number}', birth_date = '${updateUser.birth_date}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }

  getUsers() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "read",
      "Data": `Select cast(user_id as text), user_name, name_, surname_, password_, email_, phone_number, birth_date from users`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }

  getUserByUserName(username: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "read",
      "Data": `Select cast(user_id as text), user_name, name_, surname_, password_, email_, phone_number, birth_date from users where user_name = '${username}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message[0]
      })
    )
  }

  deleteUser(username: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersDataStoreid,
      "Operation": "update",
      "Data": `delete * from users where user_name = '${username}'`,
      "Encrypted": "1951"
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    )
  }

  getUserIDfromCourses(id:any){
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.usersCourseDataStoreId,
      "Operation": "read",
      "Data": `select * from users_course where userid= '${id}'`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message[0];
      })
    );
  }



  insertUserToExam(data:any){
    const body = {
      "Token": this.authService.getToken(),
      "DataStoreId": Endpoints.usersCourseDataStoreId,
      "Operation": "insert",
      "Data": `INSERT INTO users_course (userid, examid) VALUES ('${data.userid}','${data.examid}')`,
      "Encrypted": '1951'
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
}


deleteUserFromExam(userid: string,examid:string) {
  const body = {
    "Token": this.token,
    "DataStoreId": Endpoints.usersCourseDataStoreId,
    "Operation": "delete",
    "Data": `delete from users_course where userid = '${userid}' and examid='${examid}`,
    "Encrypted": "1951"
  }
  return this.http.post(Endpoints.dataops, body).pipe(
    map((response: any) => {
      return response
    })
  )
}



  exams = [
    { name: 'YDS', examid: '6e6e28f6-5df0-4da5-9e29-53a91dbb0e9c', img: '/assets/icons/yds.png'},
    { name: 'YGS', examid: '1', img: '/assets/icons/ygs.png'},
    { name: 'KPSS', examid: 3 , img: '/assets/icons/kpss.png'},
    { name: 'ALES', examid: 3 , img: '/assets/icons/ales.png'},
    { name: 'LGS', examid: 3 , img: '/assets/icons/lgs.png'}
  ];

  selectedExam:any
  selectedUserId:any
  examidd:any

  saveId(){
    const user=localStorage.getItem('user')
    if (user) {
      const jsonuser=JSON.parse(user)
      if (jsonuser.userId) {
        this.selectedUserId=jsonuser.userId
      }
      else{
        console.error('parse hatasi')
      }
      // // // console.log('USERID',this.selectedUserId)
    }

    // localStorage.setItem('currentExam',examname)
    this.selectedExam=localStorage.getItem('currentExam')
    // console.log('secilen sinav',this.selectedExam)

    // return this.selectedExam
    const secilenSinav = this.exams.find((sinav) => sinav.name === this.selectedExam);
    if (secilenSinav) {
      this.examidd = secilenSinav.examid;
      // // // console.log(`Seçilen sınavın examid'si: ${this.examidd}`);
    } else {
      console.log('Geçersiz sınav adı.');
    }
    const data= {
      userid:this.selectedUserId,
      examid:this.examidd
    }
    return data
    // console.log(data)
    

  }

  getexams(){
    return this.exams
  }

  
}
