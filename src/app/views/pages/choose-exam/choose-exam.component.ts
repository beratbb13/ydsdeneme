import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-choose-exam',
  templateUrl: './choose-exam.component.html',
  styleUrls: ['./choose-exam.component.css']
})
export class ChooseExamComponent implements OnInit{


   constructor(private router:Router,private auth:AuthService){

   }
   ngOnInit(): void {
     this.ifLoggedIn()
   }


  goToPage(buttonText: string) {
    this.router.navigate(['/homepage/filter'], { state: { buttonText: buttonText } });
  }
  gologin(){
    this.router.navigate(['/login'])
  }

  onButtonClick(buttonName: string) {
    this.auth.setSelectedButton(buttonName);
  }


  loggedIn!:boolean
  loggedUser:string=''
  ifLoggedIn(){
    const currentuser=localStorage.getItem('currentUser')
    if ((currentuser !== null && currentuser !== undefined)){
      const userJSON=JSON.parse(currentuser)
      if (userJSON.user_name) {
        const username = userJSON.user_name;
        if (username) {
          this.loggedUser=username;
          this.loggedIn=true
        }
    }}
  }
}
