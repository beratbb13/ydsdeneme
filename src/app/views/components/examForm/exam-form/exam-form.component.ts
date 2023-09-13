import { Component } from '@angular/core';
import { answer } from 'src/app/models/answer';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { ExamService } from 'src/app/services/examService/exam.service';
import { QuestionService } from 'src/app/services/questionService/question.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { tap } from 'rxjs';
import { question } from 'src/app/models/question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { Router } from '@angular/router';

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
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private router: Router) { }

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
    ).subscribe(() => this.questions.map((question: question) => this.createFormControlObject(question)))
    //).subscribe(() => setTimeout(() => this.questions.map((question: question) => this.createFormControlObject(question)), 1000));
  }

  getAnswersWithQuestionIds(question: question) {
    this.answerService.getAnswersByQuestionId(question.questionid).subscribe(
      res => question.answers = res);
  }

  createFormControlObject(question: question) {
    const newFormControl = this.formBuilder.control("");
    this.questionForm.addControl(question.questionid, newFormControl);
  }

  isShown: boolean = false;
  getForm() {
    this.isShown = true;
    console.log(this.questionForm.controls)
    this.timer();
  }
  testSuresi: number = 1800;
  dakika: number = 0;
  saniye: number = 0;

  timer() {
    setInterval(() => {
      if (this.testSuresi > 0) {
        this.testSuresi -= 1;
        this.dakika = Math.floor(this.testSuresi / 60);
        this.saniye = this.testSuresi % 60;
      }
    }, 1000);
  }


  showResult(sonuc: string, message: string) {
    //let sonuc = this.reply();
    this.dialogService.openTextModal(sonuc, message).onClose.subscribe(() => this.router.navigate(['/homepage/aboutus']))
  }

  previousQuestion() {
    if (!(this.soruIndex < 0))
      this.soruIndex -= 1;
  }

  nextQuestion() {
    if (this.soruSayisi > this.soruIndex + 1)
      this.soruIndex += 1;
  }

  reply() {
    this.isShown = false;
    this.testSuresi = 0;
    let dogru = 0;
    let yanlis = 0;
    let bos = 0;
    let controlNames = Object.values(this.questionForm.controls);
    controlNames.map(e => {
      if (e.value.istrue === 1) {
        console.log('dogru');
        dogru++;
      } else if (e.value.istrue === 0) {
        console.log('yanlis')
        yanlis++;
      } else if (e.value.istrue === undefined) {
        console.log('bos')
        bos++;
      }
    });
    //return `Dogru: ${dogru},  Yanlis: , ${yanlis},  Bos: , ${bos}`
    this.showResult('Sonuç', `Dogru: ${dogru}  Yanlis:  ${yanlis}  Bos:  ${bos}`);
  }
}