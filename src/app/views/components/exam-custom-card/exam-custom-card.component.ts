import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exam-custom-card',
  templateUrl: './exam-custom-card.component.html',
  styleUrls: ['./exam-custom-card.component.css']
})
export class ExamCustomCardComponent {
  @Input() exam:any

}
