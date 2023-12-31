import { Component, HostListener } from '@angular/core';
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
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent {

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private userService: UserService,
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
  dogruCevap!: any | undefined;
  soruIndex: number = 0;
  soruSayisi: number = 0;
  secilenCevap: string | null = null;
  selectedCategoryName: any
  trueIcon: string = 'fa-solid fa-check fa-beat';
  trueIconColor: string = '#20511f';
  falseIcon: string = 'fa-solid fa-x';
  falseIconColor: string = '#ff0000';
  questionStatus: { [key: string]: 'correct' | 'incorrect' | 'unanswered' | 'answered' } = {};


  showEllipsisButton: boolean = false;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  visibleButtons: any = [];
  totalPages: number = 0;

  user: any

  ngOnInit() {
    this.user = localStorage.getItem('user')
    this.user = JSON.parse(this.user)
    this.category = history.state.category;
    this.getQuestionsAndAnswers();
    this.questionForm = this.formBuilder.group({})
    this.visibleButtons = Array.from({ length: this.itemsPerPage }, (_, i) => i);
    this.soruIndex = 0;
    this.timer()

    let ydsExamid = '6e6e28f6-5df0-4da5-9e29-53a91dbb0e9c'
    this.userService.insertUserToExamWCategory({ userid: this.user.userId, examid: ydsExamid, categoryid: this.category.ecategoryid }).subscribe()
  }

  goToQuestion(index: number) {
    if (index != this.soruIndex) {
      this.reply()
      this.dogruCevap = undefined
    }

    if (index >= 0 && index <= this.soruSayisi) {
      this.soruIndex = index;
      this.currentPage = Math.floor(index / this.itemsPerPage);

      // Tüm düğmelerden .active sınıfını kaldır
      const buttons = document.querySelectorAll('.paginationbuttons');
      buttons.forEach((button) => {
        button.classList.remove('active');
      });

      // Tıklanan düğmeye .active sınıfını ekle
      buttons[index].classList.add('active');

    }

  }

  updatePaginationButtons() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.questions.length);
    this.visibleButtons = [];
    for (let i = startIndex; i < endIndex; i++) {
      this.visibleButtons.push(i);
    }
    this.showEllipsisButton = this.currentPage < this.totalPages - 1;

  }

  shouldShowEllipsis(): boolean {
    const totalPages = Math.ceil(this.questions.length / this.itemsPerPage);
    return this.currentPage < totalPages - 1;
  }

  getQuestionsAndAnswers() {
    this.spinnerService.show()
    this.questionService.getQuestionsAndAnswers(this.user.userId, this.category.ecategoryid).pipe(
      tap(res => this.answerswithQuestions = [...this.answerswithQuestions, ...res]), // =  res
      tap(res => this.lastQuestions = res),
      //tap(() => this.soruSayisi = this.answerswithQuestions.length / 5),
      tap(() => this.pullQuestions()),
      tap(() => this.answerswithQuestions.map((answer: any) => this.createFormControlObject(answer.questionid))),
      tap(() => this.updatePaginationButtons()),
      tap(() => this.totalPages = Math.ceil(this.questions.length / this.itemsPerPage)),
      tap(() => this.spinnerService.hide())
    ).subscribe()
  }

  lastQuestions: any[] = []
  lastQuestionIds: any[] = []

  pullQuestions() {
    this.lastQuestionIds = []
    this.lastQuestions.map(answer => {
      if (!this.lastQuestionIds.includes(answer.questionid))
        this.lastQuestionIds.push(answer.questionid)
    })

    console.log(this.lastQuestionIds)

    this.answerswithQuestions.map(answer => {
      if (!this.questionids.includes(answer.questionid)) {
        this.questions.push({ questionid: answer.questionid, question: answer.question, examid: answer.examid, ecategoryid: answer.ecategoryid });
        this.questionids.push(answer.questionid)
      }
    })

    console.log(this.answerswithQuestions)
    this.questions.map(ques => {
      ques.answers = this.answerswithQuestions.filter(ans => (ans.questionid == ques.questionid))
    })
    this.soruSayisi = this.questions.length
    console.log(this.questions)
  }

  setScore() {
    let array: any[] = []
    this.lastQuestionIds.map(id => {
      array.push({ user_id: this.user.userId, exam_id: '6e6e28f6-5df0-4da5-9e29-53a91dbb0e9c', category_id: this.category.ecategoryid, question_id: id })
      //this.userScoreService.insertUserScore([{ user_id: user_id, question_id: id }])/*.subscribe(res => console.log(res));*/
    })
    this.userScoreService.insertUserScore(array).subscribe(res => {
      if (res.message == 'Success')
        this.getQuestionsAndAnswers();

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
        this.dakika += Math.floor(this.saniye / 60);
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
      this.router.navigate(['user/exams']);
    })
  }

  nextQuestion() {

    this.questions[this.soruIndex].answers?.map(a => console.log(a))

    if (this.soruSayisi > this.soruIndex) {
      this.soruIndex += 1;
      this.currentPage = Math.floor(this.soruIndex / this.itemsPerPage);

      if ((this.soruIndex + 1) % this.itemsPerPage === 1 && (this.currentPage * this.itemsPerPage) === this.questions.length) {
        this.setScore()
        this.loadNextPage();
      }
      this.updatePaginationButtons();
    }
    this.dogruCevap = undefined;
  }

  loadNextPage() {
    this.updatePaginationButtons();
  }

  previousQuestion() {

    if (!(this.soruIndex < 0)) {
      this.soruIndex -= 1;
      this.currentPage = Math.floor(this.soruIndex / this.itemsPerPage);
      this.updatePaginationButtons();
    }
    this.dogruCevap = undefined;
  }

  checked() {
    let current: question = this.questions[this.soruIndex];
    if (this.questionStatus[current.questionid] == undefined) {
      this.questionStatus[current.questionid] = 'answered';
    }
  }


  reply() {
    //clearInterval(this.interval);

    let current: question = this.questions[this.soruIndex];
    this.dogruCevap = current.answers?.find(answer => answer.trueanswer === 1);
    let answered = this.questionForm.controls[current.questionid].value

    if (!answered)
      this.questionStatus[current.questionid] = 'unanswered'
    else if (this.dogruCevap == answered) {
      this.questionStatus[current.questionid] = 'correct';
    } else {
      this.questionStatus[current.questionid] = 'incorrect';
    }
  }

  getButtonBackgroundColor(questionId: string): string {
    /*const status = this.questionStatus[questionId];
*/
    /*let trueanswer = this.questionForm.controls[questionId].value

    if (trueanswer && trueanswer === 1) {
      console.log('true')
      return 'green'
    } else if (trueanswer && trueanswer === 0) {
      console.log('false')
      return 'red'
    } else {
      console.log('yok')
      return 'white'
    }*/

    const status = this.questionStatus[questionId]

    if (status === 'correct') {
      return 'green'; // Doğru cevaplanan sorular için yeşil arka plan
    } else if (status === 'incorrect') {
      return 'red'; // Yanlış cevaplanan sorular için kırmızı arka plan
    } else if (status === 'answered') {
      return 'rgb(105, 14, 245)'; // Yanlış cevaplanan sorular için kırmızı arka plan
    }
    else {
      return '#EDF1F6'; // Cevap verilmemiş sorular için varsayılan arka plan
    }
  }

  sinaviBitir() {
    clearInterval(this.interval)

    let controls = Object.values(this.questionForm.controls);
    let trueQuestions: any[] = [];
    let falseQuestions: any[] = [];
    let emptyQuestions: any[] = [];
    let trueIds: any[] = [];
    let falseIds: any[] = [];

    controls.map(control => {
      if (control.value.trueanswer == 1) {
        trueQuestions.push({ question: this.questions.filter(ques => control.value.questionid == ques.questionid)[0], trueanswer: true });
        trueIds.push(control.value.questionid);
      }
      else if (control.value.trueanswer == 0) {
        falseQuestions.push({ question: this.questions.filter(ques => control.value.questionid == ques.questionid)[0], trueanswer: false });
        falseIds.push(control.value.questionid);
      }
    })

    emptyQuestions = this.questions.filter(ques => (!trueIds.includes(ques.questionid) && !falseIds.includes(ques.questionid)));
    let emptyQuestion: any[] = []
    emptyQuestions.map(ques => {
      emptyQuestion.push({ question: ques, trueanswer: false })
    })

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

    let allQuestions = [...trueQuestions, ...falseQuestions, ...emptyQuestion];
    let updatedQuestions = allQuestions.filter(allQ => !this.lastQuestionIds.includes(allQ.question.questionid))
    let insertedQuestions = allQuestions.filter(allQ => this.lastQuestionIds.includes(allQ.question.questionid))

    let user_id = this.user.userId

    updatedQuestions.map(updQ => {
      let trueanswer = updQ.trueanswer ? '1' : '0'

      this.userScoreService.updateUserScore({
        userid: user_id, examid: updQ.question.examid,
        categoryid: this.category.ecategoryid, questionid: updQ.question.questionid, trueanswer: trueanswer
      }).subscribe(res => console.log(res))
    })


    let scoreBody: string = ''
    insertedQuestions.map((ques: any, indis: number) => {
      if (ques.trueanswer && ques.trueanswer == true)
        scoreBody += `('${user_id}', '${ques.question.examid}', '${this.category.ecategoryid}', '${ques.question.questionid}', '1', 'now()')`
      else if (ques.trueanswer && ques.trueanswer == false)
        scoreBody += `('${user_id}', '${ques.question.examid}', '${this.category.ecategoryid}', '${ques.question.questionid}', '0', 'now()')`
      else
        scoreBody += `('${user_id}', '${ques.question.examid}', '${this.category.ecategoryid}', '${ques.question.questionid}', '0', 'now()')`
      if (insertedQuestions[indis + 1]) {
        scoreBody += ','
      }
    })

    this.userScoreService.insertExamScore(scoreBody).subscribe(res => console.log(res))

    let sure = this.dakika.toString() + ':' + (this.saniye < 10) ? '0' : '' + this.saniye.toString()
    this.openResultModal({ items: items, questions: allQuestions, duration: sure });

  }


}
