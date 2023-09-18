import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-choose-exam',
  templateUrl: './choose-exam.component.html',
  styleUrls: ['./choose-exam.component.css']
})
export class ChooseExamComponent implements OnInit{
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
}
