import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enter-exam',
  templateUrl: './enter-exam.component.html',
  styleUrls: ['./enter-exam.component.css']
})
export class EnterExamComponent implements OnInit{
selectedExam:string | null = null;
constructor(){}

ngOnInit(): void {
  this.selectedExam=localStorage.getItem('currentExam')
}


}
