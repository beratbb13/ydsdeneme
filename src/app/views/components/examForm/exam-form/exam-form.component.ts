import { Component } from '@angular/core';
import { answer } from 'src/app/models/answer';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { ExamService } from 'src/app/services/examService/exam.service';
import { QuestionService } from 'src/app/services/questionService/question.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { tap } from 'rxjs';
import { question } from 'src/app/models/question';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent {

  constructor(private examService: ExamService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder) { }

  questions: question[] = [];
  answers: answer[] = []
  questionForm!: FormGroup
  category: any
  soruIndex: number = 0;
  soruSayisi: number = 0;
  secilenCevap: string | null = null;

  ngOnInit() {
    this.category = history.state.category;
    this.getQuestions();

    this.questionForm = this.formBuilder.group({})
  }

  getQuestions() {
    this.spinnerService.show();
    this.questionService.getQuestionsByCategoryId(this.category.ecategoryid).pipe(
      tap(res => this.questions = res),
      tap(() => this.soruSayisi = this.questions.length),
      tap(() => this.spinnerService.hide()),
      tap(() => this.questions.map(question => this.getAnswersWithQuestionIds(question))),
    ).subscribe(() => setTimeout(() => this.questions.map((question: question) => this.createForm(question)), 100));
  }

  getAnswersWithQuestionIds(question: question) {
    this.answerService.getAnswersByQuestionId(question.questionid).subscribe(
      res => question.answers = res);
  }

  createForm(question: question) {
    const newFormGroup = this.formBuilder.array([]);
    question.answers?.map((answer: answer) => {
      newFormGroup.push(new FormControl(answer))
    })
    this.questionForm.addControl(question.questionid, newFormGroup);
  }

  getForm() {
    console.log(this.questionForm)
  }

  previousQuestion() {
    if (!(this.soruIndex < 0)) {
      this.soruIndex -= 1;
    }
  }

  nextQuestion() {
    if (this.soruSayisi > this.soruIndex + 1) {
      this.soruIndex += 1;
    }
  }

  reply() {

  }

}

