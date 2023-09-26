import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ExamRegisterService } from 'src/app/services/exam-registration/exam-register.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { ToastService } from 'src/app/services/toastService/toast.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-go-on',
  templateUrl: './go-on.component.html',
  styleUrls: ['./go-on.component.css']
})
export class GoOnComponent implements OnInit{
  selectedButton: string | null = null;

  loggedIn:boolean=false

  users:any[]=[]

  constructor(private authService:AuthService,private userService:UserService,
    private examRegister:ExamRegisterService,
    private spinner:SpinnerService,
    private tost:ToastService,
    private router:Router){

  }

  ngOnInit(): void {
    this.selectedButton = this.authService.getSelectedButton();
    this.getUsersFromYDS()
    this.ifLoggedIn()
  }

  getUsersFromYDS(){
    this.examRegister.getUsers().subscribe((res:any)=>{
      this.users=res
      console.log(this.users)
    })
  }

  registerToCourse(){
    const currentuser=localStorage.getItem('currentUser')
    if ((currentuser !== null && currentuser !== undefined)){
      const userJSON=JSON.parse(currentuser)
      if (userJSON.user_name) {
        const username = userJSON.user_name;
        console.log(username)
        this.userService.getUserByUserName(username).subscribe((user: any) => {
          if (user) {
            const ydsRegistration = {
              id: user.user_id,
              user_name:user.user_name,
            };
            this.examRegister.insertUser(ydsRegistration).subscribe((response)=>{
              if (response==='Success'){
                this.spinner.show();

                this.tost.showToast('success','Kullanıcı Başarıyla Kaydoldu!')
                this.router.navigate(['/homepage/before-deneme'])
                this.spinner.hide()


              }else {
                this.tost.showToast('warning','Kullanici Zaten Kayıtlı.')
                // console.error('Kullanici zaten mevcut.');
              }
            });
        
          }else{
            console.warn('Kullanıcı bulunamadı.');
          }
        })

      }
    }else{
      this.tost.showToast('danger','Lütfen Giriş Yapınız!');
    }

  }

  loggedInUser: string=''

  ifLoggedIn(){
    const currentuser=localStorage.getItem('currentUser')
    if ((currentuser !== null && currentuser !== undefined)){
      const userJSON=JSON.parse(currentuser)
      if (userJSON.user_name) {
        const username = userJSON.user_name;
        if (username) {
          this.loggedInUser=username;
          this.loggedIn=true
        }
    }}
  }
    
}
