import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.css']
})
export class QuestionTableComponent {
  @Input() questions: any[] = [];

  ngOnInit() {
    console.log(this.questions)
  }
}
