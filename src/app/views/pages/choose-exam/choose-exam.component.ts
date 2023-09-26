import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-choose-exam',
  templateUrl: './choose-exam.component.html',
  styleUrls: ['./choose-exam.component.css']
})
export class ChooseExamComponent implements OnInit{

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
  goregister(){
    this.router.navigate(['/register'])
  }
}
