import { Component } from '@angular/core';
import { answer } from 'src/app/models/answer';
import { question } from 'src/app/models/question';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { ExamService } from 'src/app/services/examService/exam.service';
import { QuestionService } from 'src/app/services/questionService/question.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent {

  constructor(private examService: ExamService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private spinnerService: SpinnerService) { }
  /*
    exams: exam[] = []
  
    ngOnInit() {
      if (history.state.exam)
        this.exams = history.state.exam;
      console.log(this.exams)
    }
  */

  questions: question[] = [];
  answers: answer[] = [];

  ngOnInit() {
    this.getQuestions();
    //this.getAnswers()
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe(res => {
      this.spinnerService.show();
      this.questions = res;
      this.spinnerService.hide();
    });
  }

  /*getAnswers() {
    this.answerService.getAnswers().subscribe(res => {
      this.spinnerService.show();
      this.answers = res
      this.spinnerService.hide();
    });
  }*/

  getAnswersWithQuestionIds(questionid: string) {
    this.answerService.getAnswersByQuestionId(questionid).subscribe(res => {
      this.spinnerService.show();
      console.log(res);
      this.spinnerService.hide();
    });
  }
}
