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
  selectedExam:string| null = null;

  loggedIn:boolean=false

  users:any[]=[]

  constructor(private authService:AuthService,private userService:UserService,
    private examRegister:ExamRegisterService,
    private spinner:SpinnerService,
    private tost:ToastService,
    private router:Router){

  }

  ngOnInit(): void {
    this.getSelectedExam()

    // this.getUsersFromYDS()
    this.ifLoggedIn()


  }

  getSelectedExam(){
    const selectedex=localStorage.getItem('currentExam')
    this.selectedExam=selectedex
    console.log(this.selectedExam)
  }

  getUsersFromYDS(){
    this.examRegister.getUsers().subscribe((res:any)=>{
      this.users=res
      console.log(this.users)
    })
  }

  addUserToExam(){
    const data=this.userService.saveId()
    this.userService.insertUserToExam(data).subscribe((res:any)=>{
      console.log('Kayıt başarılı:', res);
      this.tost.showToast('success','Başarıyla Kayıt Olundu!')
      this.router.navigate(['/user/deneme'])
    },
    ()=>{
      this.tost.showToast('danger','Kullanıcı Zaten Kayıtlı!')
    }
    )

  }
  

  registerToCourse(){
    const currentuser=localStorage.getItem('user')
    if ((currentuser !== null && currentuser !== undefined)){
      const userJSON=JSON.parse(currentuser)
      if (userJSON.email) {
        const username = userJSON.email;
        console.log(username)
        this.userService.getUserByUserName(username).subscribe((user: any) => {
          if (user) {
            const ydsRegistration = {
              userid: user.userid,
              email:user.email,
            };
            this.examRegister.insertUser(ydsRegistration).subscribe((response)=>{
              if (response==='Success'){
                this.spinner.show();

                this.tost.showToast('success','Kullanıcı Başarıyla Kaydoldu!')
                this.router.navigate(['/user/before-deneme'])
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

  // ifLoggedIn(){
  //   const currentuser=localStorage.getItem('User')
  //   if ((currentuser !== null && currentuser !== undefined)){
  //     const userJSON=JSON.parse(currentuser)
  //     if (currentuser) {
  //       const username = userJSON.user_name;
  //       if (username) {
  //         this.loggedInUser=username;
  //         this.loggedIn=true
  //       }
  //   }}
  // }

  ifLoggedIn(){
    const currentuser=localStorage.getItem('Username')
    console.log(currentuser)
    if (currentuser) {
      this.loggedInUser=currentuser
      this.loggedIn=true
    }
  }
}
