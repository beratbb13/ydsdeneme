import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { answer } from 'src/app/models/answer';
import { question } from 'src/app/models/question';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';
import { ExamService } from 'src/app/services/examService/exam.service';
import { QuestionService } from 'src/app/services/questionService/question.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { ToastService } from 'src/app/services/toastService/toast.service';
import { ExamResultComponent } from 'src/app/views/components/testResult/exam-result/exam-result.component';
import { NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'app-deneme-exam',
  templateUrl: './deneme-exam.component.html',
  styleUrls: ['./deneme-exam.component.scss']
})
export class DenemeExamComponent {

  constructor(private examService: ExamService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private toastService: ToastService,
    private router: Router) { }

  questions: question[] = [];
  answers: answer[] = []
  questionForm!: FormGroup
  category = { Name: "2013 Sonbahar YDS", ecategoryid: "7f6c03a8-71bb-4dbd-8d6d-10e47848d1a7" };
  soruIndex: number = 0;
  soruSayisi: number = 0;
  secilenCevap: string | null = null;



  ngOnInit() {
    this.getQuestions();
    this.questionForm = this.formBuilder.group({});
    
    this.startCountdown();
  }

  minutes: number = 80; 
  seconds: number = 0; 

  startCountdown() {
    const countdownInterval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        clearInterval(countdownInterval); // zaman bitince durdur
      }
      
    }, 1000);
  }





  getQuestions() {
    // this.spinnerService.show();
    this.questionService.getQuestionsByCategoryId(this.category.ecategoryid).pipe(
      tap(res => this.questions = res),
      tap(() => this.soruSayisi = this.questions.length),
      tap(() => this.spinnerService.hide()),
      tap(() => this.questions.map(question => this.getAnswersWithQuestionIds(question))),
      tap(() => this.questions.map((question: question) => this.createFormControlObject(question)))
    ).subscribe(() => this.timer());


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

  toplamSure = 4800;
  dakika: number = 0;
  saniye: number = 0;

  timer() {
    setInterval(() => {
      if (this.toplamSure > 0)
        this.toplamSure -= 1;
      this.dakika = Math.floor(this.toplamSure / 60);
      this.saniye = this.toplamSure % 60;
    }, 1000)
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
    /*
        let currentid: string = this.questions[this.soruIndex - 1].questionid;
        let controls = Object.values(this.questionForm.controls);
        let answered = controls.find(e => currentid == e.value.questionid);
    
        if (answered?.value.istrue === 1) {
          this.toastService.showToast('success', 'Soruyu Doğru Cevapladınız.');
        } else if (answered?.value.istrue === 0) {
          this.toastService.showToast('danger', 'Soruyu Yanlış Cevapladınız.');
          this.dogruCevap = this.questions[this.soruIndex - 1].answers?.find(e => e.istrue == true);
          this.toastService.showToast('warning', `Dogru cevap: ${this.dogruCevap?.answer}`);
        } else if (answered?.value.istrue === undefined) {
          this.toastService.showToast('warning', 'Soruyu Boş Bıraktınız.');
        }*/

  }

  openResultModal(sonuc: string) {
    let dialogref: NbDialogRef<any> = this.dialogService.openModal(ExamResultComponent, true, true, 'right-modal', sonuc)
    dialogref.onClose.subscribe(async (res) => {
      this.router.navigate(['/homepage/aboutus']);
    })
  }


  reply() {
    this.toplamSure = 0;
    /*
    //this.testSuresi = 0;
    let dogru = 0;
    let yanlis = 0;
    let bos = 0;
    */
    let controlNames = Object.values(this.questionForm.controls);
    let questions = Object.keys(this.questionForm.controls);

    this.questions.map(q => {
      q.answers = q.answers?.filter(a => a.istrue === 1)
    })

    this.questions.map(e => {
      console.log('Question: ', e.question);
      console.log('Answer: ', e.answers?.map(e => e.answer))
    })

    /*controlNames.map(e => {
      if (e.value.istrue === 1) {
        console.log('dogru');
      } else if (e.value.istrue === 0) {
        console.log('yanlis')
      } else if (e.value.istrue === undefined) {
        console.log('bos')
      }
    });*/
    //return `Dogru: ${dogru},  Yanlis: , ${yanlis},  Bos: , ${bos}`
    //this.showResult('Sonuç', `Dogru: ${dogru}  Yanlis:  ${yanlis}  Bos:  ${bos}`);
    let result = 'basarili';

    this.openResultModal(result)
    /*
        let currentid: string = this.questions[this.soruIndex].questionid;
        let controls = Object.values(this.questionForm.controls);
        let answered = controls.find(e => currentid == e.value.questionid);
    
        if (answered?.value.istrue === 1) {
          //this.toastService.showToast('success', 'Soruyu Doğru Cevapladınız.');
          //this.dogruCevap = this.questions[this.soruIndex].answers?.find(e => e.istrue == true);
          /*this.trueIcon = 'fa-solid fa-check fa-beat'
          this.trueIconColor = '#20511f'*/

    //} else if (answered?.value.istrue === 0) {
    //this.toastService.showToast('danger', 'Soruyu Yanlış Cevapladınız.');
    //this.dogruCevap = this.questions[this.soruIndex].answers?.find(e => e.istrue == true);
    //this.toastService.showToast('warning', `Dogru cevap: ${this.dogruCevap?.answer}`);
    /*this.falseIcon = 'fa-solid fa-x'
    this.falseIconColor = '#ff0000'*/

    //} else if (answered?.value.istrue === undefined) {
    //this.toastService.showToast('warning', 'Soruyu Boş Bıraktınız.');
    //}*/

  }

  exit() {
    this.router.navigate(['/homepage/filter']);
  }


}
/*
  constructor(private examCategorService: ExamCategoryService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,) {
  }
  questions: question[] = [];
  answers: answer[] = []
  questionForm!: FormGroup
  soruIndex: number = 0;
  soruSayisi: number = 0;
  secilenCevap: string | null = null;
  exams: any[] = []
  categoryids: string[] = []

  ngOnInit() {
    this.getExams();
    this.questionForm = this.formBuilder.group({});
  }

  getExams() {
    this.examCategorService.getCategories().pipe(
      tap(res => this.exams = res),
      tap(res => console.log(res)),
      tap(() => this.getQuestions()),
      tap(() => this.getAnswersByQuestionId()),
    ).subscribe(() => setTimeout(() => this.createFormControlObject(), 1000));
  }

  createFormControlObject() {
    this.exams.map((exam: any) => {
      exam.questions.map((ques: any) => {
        const newFormControl = this.formBuilder.control("");
        this.questionForm.addControl(ques.questionid, newFormControl);
      })
    })
  }


  getQuestions() {
    this.exams.map(e => {
      this.questionService.getRandomQuestionsByCategoryId(e.ecategoryid, 3).subscribe(res => e.questions = res);
    })
    /*
  
  
          let categoryIds = this.exams.map(e => e.ecategoryid);
          let idlist = categoryIds.join(','); 
          //= '${categoryId}'
          this.questionService.getRandomQuestionsByCategoryId(idlist, 3).subscribe(res => this.questions = res);
    
  }

  getAnswersByQuestionId() {
    this.exams.map(e => {
      e.questions.map((question: any) => {
        this.answerService.getAnswersByQuestionId(question.questionid).subscribe(res => question.answers = res);
      })
    })
  }

}
*/