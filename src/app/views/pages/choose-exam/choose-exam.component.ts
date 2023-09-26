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

  exams:any[]=[
    {name:'YDS',text:'lorem ipsum dolar sit amet',img:'/assets/icons/yds.png'},
    {name:'KPSS',text:'lorem ipsum dolar sit amet',img:'/assets/icons/kpss.png'},
    {name:'YGS',text:'lorem ipsum dolar sit amet',img:'/assets/icons/ygs.png'},
    {name:'ALES',text:'lorem ipsum dolar sit amet',img:'/assets/icons/ales.png'},
    {name:'LGS',text:'lorem ipsum dolar sit amet',img:'/assets/icons/lgs.png'},

  ]

  infos:any[]=[
    {title:'Çalışma Sorularıyla Pratik Yap',text:'Sistemde tanımlı yüzlerce çalışma sorusu ile pratik yap.',img:'/assets/pictures/exam2.png'},
    {title:'Deneme Sınavları Çöz',text:'Deneme sınavları ile seviyeni tespit et puanlamanı gör.',img:'/assets/pictures/online.png'},
    {title:'İstatistiklerini Gör',text:'Sistem üzerinden başarı oranlarını gör ve planlamanı yap.',img:'/assets/pictures/stat.png'},

  ]

   constructor(private router:Router){

   }
   ngOnInit(): void {


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

  goregister(){
    this.router.navigate(['/register'])

  }
}
