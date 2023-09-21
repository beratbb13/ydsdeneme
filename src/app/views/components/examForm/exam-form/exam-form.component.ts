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
import { ToastService } from 'src/app/services/toastService/toast.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent {

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
  category: any
  soruIndex: number = 0;
  soruSayisi: number = 0;
  secilenCevap: string | null = null;
  selectedCategoryName:any

  ngOnInit() {
    this.category = history.state.category;
    this.selectedCategoryName = this.category.Name;
    console.log("seçili kategori",this.selectedCategoryName);
    this.getQuestions();
    this.questionForm = this.formBuilder.group({})
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


  dakika: number = 0;
  saniye: number = 0;

  timer() {
    setInterval(() => {
      if (!(this.saniye < 60)) {
        this.dakika = Math.floor(this.saniye / 60);
        this.saniye = 0;
      }
      this.saniye += 1;
    }, 1000)
  }


  showResult(sonuc: string, message: string) {
    //let sonuc = this.reply();
    this.dialogService.openTextModal(sonuc, message).onClose.subscribe(() => this.router.navigate(['/homepage/aboutus']))
  }

  previousQuestion() {
    if (!(this.soruIndex < 0))
      this.soruIndex -= 1;
    this.dogruCevap = undefined;
  }

  dogruCevap!: answer | undefined;

  nextQuestion() {
    if (this.soruSayisi > this.soruIndex + 1)
      this.soruIndex += 1;
    this.dogruCevap = undefined;
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

  trueIcon: string = 'fa-solid fa-check fa-beat';
  trueIconColor: string = '#20511f';
  falseIcon: string = 'fa-solid fa-x';
  falseIconColor: string = '#ff0000';

  reply() {/*
    //this.testSuresi = 0;
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
  */

    let currentid: string = this.questions[this.soruIndex].questionid;
    let controls = Object.values(this.questionForm.controls);
    let answered = controls.find(e => currentid == e.value.questionid);

    if (answered?.value.istrue === 1) {
      this.toastService.showToast('success', 'Soruyu Doğru Cevapladınız.');
      this.dogruCevap = this.questions[this.soruIndex].answers?.find(e => e.istrue == 1);
      /*this.trueIcon = 'fa-solid fa-check fa-beat'
      this.trueIconColor = '#20511f'*/

    } else if (answered?.value.istrue === 0) {
      this.toastService.showToast('danger', 'Soruyu Yanlış Cevapladınız.');
      this.dogruCevap = this.questions[this.soruIndex].answers?.find(e => e.istrue == 1);
      this.toastService.showToast('warning', `Dogru cevap: ${this.dogruCevap?.answer}`);
      /*this.falseIcon = 'fa-solid fa-x'
      this.falseIconColor = '#ff0000'*/

    } else if (answered?.value.istrue === undefined) {
      this.toastService.showToast('warning', 'Soruyu Boş Bıraktınız.');
    }

  }

  sinaviBitir() {
    // Sınavı bitirme işlemleri
    let dogruSayisi = 0;
    let yanlisSayisi = 0;
    let bosSayisi = 0;
  
    // Tüm soruları dönerek cevapları kontrol et
    this.questions.forEach((soru, index) => {
      const soruForm = this.questionForm.get(index.toString()); // Soru formunu al
  
      if (soruForm) {
        const cevap = soruForm.value; // Kullanıcının verdiği cevap
        const dogruCevap = soru.answers?.find(answer => answer.istrue === 1); // Doğru cevap
  
        if (cevap === undefined) {
          bosSayisi++;
        } else if (cevap === dogruCevap?.answer) {
          dogruSayisi++;
        } else {
          yanlisSayisi++;
        }
      }
    });
  
    // Sonuçları göster
    this.toastService.showToast('success', `Doğru Sayısı: ${dogruSayisi}`);
    this.toastService.showToast('danger', `Yanlış Sayısı: ${yanlisSayisi}`);
    this.toastService.showToast('warning', `Boş Sayısı: ${bosSayisi}`);
  }
  


}