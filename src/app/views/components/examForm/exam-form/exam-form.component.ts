import { Component } from '@angular/core';
import { answer } from 'src/app/models/answer';
import { QuestionService } from 'src/app/services/questionService/question.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { tap } from 'rxjs';
import { question } from 'src/app/models/question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { Router } from '@angular/router';
import { ExamResultComponent } from '../../testResult/exam-result/exam-result.component';
import { NbDialogRef } from '@nebular/theme/public_api';
import { UserScoreService } from 'src/app/services/userScoreService/user-score.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent {

  constructor(
    private questionService: QuestionService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private userScoreService: UserScoreService,
    private router: Router) { }

  questionForm!: FormGroup
  category: any
  answerswithQuestions: any[] = [];
  answers: answer[] = [];
  questions: question[] = [];
  questionids: string[] = [];
  dogruCevap!: answer | undefined;
  soruIndex: number = 0;
  soruSayisi: number = 0;
  secilenCevap: string | null = null;
  selectedCategoryName: any
  trueIcon: string = 'fa-solid fa-check fa-beat';
  trueIconColor: string = '#20511f';
  falseIcon: string = 'fa-solid fa-x';
  falseIconColor: string = '#ff0000';


  ngOnInit() {
    this.category = history.state.category;
    this.getQuestionsAndAnswers();
    this.questionForm = this.formBuilder.group({})
  }

  getQuestionsAndAnswers() {
    this.spinnerService.show();
    this.questionService.getQuestionsAndAnswersByCategoryId(this.category.ecategoryid).pipe(
      tap(res => this.answerswithQuestions = [...this.answerswithQuestions, ...res]), // =  res
      tap(() => this.soruSayisi += this.answerswithQuestions.length / 5),
      tap(() => this.pullQuestions()),
      tap(() => this.answerswithQuestions.map((answer: any) => this.createFormControlObject(answer.questionid))),
      tap(() => this.spinnerService.hide())
    ).subscribe(() => this.timer());
  }

  pullQuestions() {
    this.answerswithQuestions.map(answer => {
      if (!this.questionids.includes(answer.questionid)) {
        this.questions.push({ questionid: answer.questionid, question: answer.question, examid: answer.examid, ecategoryid: answer.ecategoryid });
        this.questionids.push(answer.questionid)
      }
    })
    this.questions.map(ques => {
      ques.answers = this.answerswithQuestions.filter(ans => ans.questionid == ques.questionid)
    })
    console.log(this.questions)
  }

  setScore() {
    let user = localStorage.getItem('currentUser')
    let user_id = user ? JSON.parse(user).user_id : '';

    this.questionids.map(id => {
      this.userScoreService.insertUserScore({ user_id: user_id, question_id: id }).subscribe(res => console.log(res));
    })
  }

  createFormControlObject(questionid: string) {
    if (this.questionForm.get(questionid) == null) {
      const newFormControl = this.formBuilder.control("");
      this.questionForm.addControl(questionid, newFormControl);
    }
  }

  dakika: number = 0;
  saniye: number = 0;
  interval: any;

  timer() {
    this.interval = setInterval(() => {
      if (!(this.saniye < 60)) {
        this.dakika = Math.floor(this.saniye / 60);
        this.saniye = 0;
      }
      this.saniye += 1;
    }, 1000)
  }

  showResult(sonuc: string, message: string) {
    this.dialogService.openTextModal(sonuc, message).onClose.subscribe(() => this.router.navigate(['/user/aboutus']))
  }

  openResultModal(sonuc: any) {
    let dialogref: NbDialogRef<any> = this.dialogService.openModal(ExamResultComponent, true, true, 'right-modal', sonuc)
    dialogref.onClose.subscribe(() => {
      this.router.navigate(['/homepage/filter']);
    })
  }

  previousQuestion() {
    if (!(this.soruIndex < 0))
      this.soruIndex -= 1;
    this.dogruCevap = undefined;
  }

  nextQuestion() {
    if (this.soruSayisi > this.soruIndex + 1)
      this.soruIndex += 1;
    this.dogruCevap = undefined;
    if ((this.soruIndex + 1) % 10 == 0) {
      this.setScore();
      this.getQuestionsAndAnswers();
    }
  }

  reply() {
    clearInterval(this.interval);

    let current: question = this.questions[this.soruIndex];
    let trueAnswer: answer | undefined = current.answers?.find(answer => answer.istrue === 1);
    this.dogruCevap = trueAnswer;
  }

  sinaviBitir() {

    let controls = Object.values(this.questionForm.controls);
    let trueQuestions: question[] = [];
    let falseQuestions: question[] = [];
    let emptyQuestions: question[] = [];
    let trueIds: any[] = [];
    let falseIds: any[] = [];

    controls.map(control => {
      if (control.value.istrue == 1) {
        trueQuestions.push(this.questions.filter(ques => control.value.questionid == ques.questionid)[0]);
        trueIds.push(control.value.questionid);
      }
      else if (control.value.istrue == 0) {
        falseQuestions.push(this.questions.filter(ques => control.value.questionid == ques.questionid)[0]);
        falseIds.push(control.value.questionid);
      }
    })

    emptyQuestions = this.questions.filter(ques => (!trueIds.includes(ques.questionid) && !falseIds.includes(ques.questionid)));

    let items = [
      {
        title: 'Soru Sayısı',
        expanded: true,
        badge: {
          text: this.questions.length,
          status: 'primary',
        },
        children: [
          {
            title: 'Doğru Cevaplar',
            badge: {
              text: trueQuestions.length,
              status: 'success',
            }
          },
          {
            title: 'Yanlış Cevaplar',
            badge: {
              text: falseQuestions.length,
              status: 'danger',
            }
          },
          {
            title: 'Boş Cevaplar',
            badge: {
              text: emptyQuestions.length,
              status: 'warning',
            }
          }
        ]
      }
    ]

    let allQuestions = [...trueQuestions, ...falseQuestions, ...emptyQuestions];

    this.openResultModal({ items: items, questions: allQuestions });

  }

}
