import { Component } from '@angular/core';

@Component({
  selector: 'app-before-deneme',
  templateUrl: './before-deneme.component.html',
  styleUrls: ['./before-deneme.component.css']
})
export class BeforeDenemeComponent {
  selectedExam: string = ''; 
  exams = [
    { name: 'YDS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/yds.png' },
    { name: 'KPSS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/kpss.png' },
    { name: 'YGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ygs.png' },
    { name: 'ALES', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ales.png' },
    { name: 'LGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/lgs.png' },

  ]
  
}
