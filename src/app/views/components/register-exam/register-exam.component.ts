import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ExamRegisterService } from 'src/app/services/exam-registration/exam-register.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { ToastService } from 'src/app/services/toastService/toast.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-register-exam',
  templateUrl: './register-exam.component.html',
  styleUrls: ['./register-exam.component.css']
})
export class RegisterExamComponent implements OnInit{
  // exams = [
  //   { name: 'YDS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/yds.png' },
  //   { name: 'KPSS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/kpss.png' },
  //   { name: 'YGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ygs.png' },
  //   { name: 'ALES', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ales.png' },
  //   { name: 'LGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/lgs.png' },

  // ]

  exam:any

  constructor
  (
    private dialogRef: NbDialogRef<RegisterExamComponent>,
  private userService:UserService,
  private examRegister:ExamRegisterService,
  private spinner:SpinnerService,
  private tost:ToastService,
  private router:Router

  ){

  }

  ngOnInit(): void {
    localStorage.removeItem('currentExam')
    this.exam=this.userService.getexams()
  }


  closeModal(){
    this.dialogRef.close()
  }


  takeExamName(examname:any){
    // this.userService.saveId(examname)
    localStorage.setItem('currentExam',examname)
    localStorage.getItem('currentExam')
    this.router.navigate(['/user/goon'])
    this.closeModal()
  }

  // registerToCourse(){
  //   const currentuser=localStorage.getItem('user')
  //   if ((currentuser !== null && currentuser !== undefined)){
  //     const userJSON=JSON.parse(currentuser)
  //     if (userJSON.email) {
  //       const username = userJSON.email;
  //       console.log(username)
  //       this.userService.getUserByUserName(username).subscribe((user: any) => {
  //         if (user) {
  //           const ydsRegistration = {
  //             userid: user.userid,
  //             email:user.email,
  //           };
  //           this.examRegister.insertUser(ydsRegistration).subscribe((response)=>{
  //             if (response==='Success'){
  //               this.spinner.show();

  //               this.tost.showToast('success','Kullanıcı Başarıyla Kaydoldu!')
  //               this.router.navigate(['/user/before-deneme'])
  //               this.spinner.hide()


  //             }else {
  //               this.tost.showToast('warning','Kullanici Zaten Kayıtlı.')
  //               // console.error('Kullanici zaten mevcut.');
  //             }
  //           });

  //         }else{
  //           console.warn('Kullanıcı bulunamadı.');
  //         }
  //       })

  //     }
  //   }else{
  //     this.tost.showToast('danger','Lütfen Giriş Yapınız!');
  //   }

  // }
}
