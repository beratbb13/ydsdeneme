import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { answer } from 'src/app/models/answer';
import { question } from 'src/app/models/question';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { QuestionService } from 'src/app/services/questionService/question.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { ExamResultComponent } from 'src/app/views/components/testResult/exam-result/exam-result.component';
import { NbDialogRef } from '@nebular/theme';
import { UserScoreService } from 'src/app/services/userScoreService/user-score.service';

@Component({
  selector: 'app-deneme-exam',
  templateUrl: './deneme-exam.component.html',
  styleUrls: ['./deneme-exam.component.scss']
})
export class DenemeExamComponent {

  constructor(
    private userScoreService: UserScoreService,
    private questionService: QuestionService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private router: Router) { }

  questions: question[] = [];
  questionids: string[] = [];
  answers: answer[] = []
  questionForm!: FormGroup
  category = { Name: "2013 Sonbahar YDS", ecategoryid: "7f6c03a8-71bb-4dbd-8d6d-10e47848d1a7" };
  soruIndex: number = 0;
  soruSayisi: number = 0;
  secilenCevap: string | null = null;
  answerswithQuestions: any[] = [];

  ngOnInit() {
    this.getQuestionsAndAnswers();
    this.questionForm = this.formBuilder.group({});
  }

  minutes: number = 80;
  seconds: number = 0;

  startCountdown() {
    console.log(this.questionForm.value)
    const countdownInterval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        clearInterval(countdownInterval); // zaman bitince durdur
        this.reply();
      }

    }, 1000);
  }

  /*getQuestions() {
    this.spinnerService.show();
    this.questionService.getQuestionsByCategoryId(this.category.ecategoryid).pipe(
      tap(res => this.questions = res),
      tap(() => this.soruSayisi = this.questions.length),
      tap(() => this.spinnerService.hide()),
      tap(() => this.questions.map(question => this.getAnswersWithQuestionIds(question))),
      tap(() => this.questions.map((question: question) => this.createFormControlObject(question)))
    ).subscribe();
  }
*/

  getQuestionsAndAnswers() {
    this.spinnerService.show();
    this.questionService.getQuestionsAndAnswersByCategoryId(this.category.ecategoryid).pipe(
      tap(res => this.answerswithQuestions = [...this.answerswithQuestions, ...res]),
      tap(() => this.soruSayisi += this.answerswithQuestions.length / 5),
      tap(() => this.pullQuestions()),
      tap(() => this.answerswithQuestions.map((answer: any) => this.createFormControlObject(answer.questionid))),
      tap(() => this.spinnerService.hide())
    ).subscribe(() => this.startCountdown());
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

  showResult(sonuc: string, message: string) {
    this.dialogService.openTextModal(sonuc, message).onClose.subscribe(() => this.router.navigate(['/user/aboutus']))
  }

  openResultModal(sonuc: any) {
    let dialogref: NbDialogRef<any> = this.dialogService.openModal(ExamResultComponent, true, true, 'right-modal', sonuc)
    dialogref.onClose.subscribe(() => {
      this.router.navigate(['/user/filter']);
    })
  }

  previousQuestion() {
    if (!(this.soruIndex < 0))
      this.soruIndex -= 1;
  }

  nextQuestion() {
    if (this.soruSayisi > this.soruIndex + 1)
      this.soruIndex += 1;
    if ((this.soruIndex + 1) % 10 == 0) {
      this.setScore();
      this.getQuestionsAndAnswers();
    }
  }

  exit() {
    this.router.navigate(['/user/filter']);
  }

  reply() {
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
