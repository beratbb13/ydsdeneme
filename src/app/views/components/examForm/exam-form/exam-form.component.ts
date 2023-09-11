import { Component } from '@angular/core';
import { exam } from 'src/app/models/exam';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { QuestionService } from 'src/app/services/questionService/question.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent {

  constructor(private questionService: QuestionService,
    private answerService: AnswerService) { }

  exam!: exam

  ngOnInit() {
    if (history.state.exam)
      this.exam = history.state.exam
  }

}
