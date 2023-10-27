import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { tap } from 'rxjs';
import { question } from 'src/app/models/question';
import { Usercourse } from 'src/app/models/usercourse';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { RegisterExamComponent } from '../../components/register-exam/register-exam.component';

export interface examName {
  name: string,
}
@Component({
  selector: 'app-exam-filter',
  templateUrl: './exam-filter.component.html',
  styleUrls: ['./exam-filter.component.scss']
})
export class ExamFilterComponent implements OnInit {

  constructor(private answerService: AnswerService,
    private examCategoryService: ExamCategoryService,
    private spinnerService: SpinnerService,
    private dialogservice: DialogService,
    private router: Router) { }

  exams = [
    { name: 'YDS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/yds.png' },
    { name: 'KPSS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/kpss.png' },
    { name: 'YGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ygs.png' },
    { name: 'ALES', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ales.png' },
    { name: 'LGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/lgs.png' },

  ]



  pageNumber: number = 1;
  questions: question[] = [];
  categories: any[] = [];
  filteredExams: any[] = [];
  isOpen: boolean = false;
  filteredSubject: any[] = []

  parentNames: any[] = []
  parentids: any[] = []

  fexams: any

  ngOnInit(): void {
    this.getRegisteredCoursesAndExams()
  }

  getCategories(examid: string) {
    this.spinnerService.show();
    this.examCategoryService.getCategories(examid).pipe(
      tap(res => { this.categories = res; console.log(this.categories) }),
      tap(() => {
        this.categories.map(cat => {
          if (!this.parentids.includes(cat.parentid)) {
            this.parentids.push(cat.parentid)
          }
          if (!this.parentNames.includes(cat.parent_name)) {
            this.parentNames.push(cat.parent_name)
          }
        })
        this.filteredExams = this.categories.filter(category => category.parentid == '50f8882f-ac66-4e5f-9756-5fa3b7958996')

      }),
      //this.filteredExams = this.categories.filter(category => category.parentid == '50f8882f-ac66-4e5f-9756-5fa3b7958996');
      //this.filteredSubject = this.categories.filter(category => category.parentid == '50f8882f-ac66-4e5f-9756-5fa3b7958996')
    ).subscribe(() => this.spinnerService.hide());
  }

  getExam(category: string) {
    const navigationExtras: NavigationExtras = {
      state: { category: category }
    };

    this.router.navigate(['/user/examform'], navigationExtras);
  }

  sinavlar: Usercourse[] = [];

  getRegisteredCoursesAndExams() {
    const currentuser = localStorage.getItem('user')
    if ((currentuser !== null && currentuser !== undefined)) {
      const userJSON = JSON.parse(currentuser)
      if (userJSON.userId) {
        const userid = userJSON.userId;
        // console.log('useerid',userid)
        /*this.examCategoryService.getUsersCourse(userid).subscribe(
          (res: any) => {
            console.log('Başarılı istek, alinan kurslar:', res);
          },
          (error: any) => {
            console.error('Hata oluştu', error);
          }
        )*/
        this.examCategoryService.getUsersExams(userid).subscribe(
          (res: any) => {
            console.log('Basarili Istek, alinan SINAVLAR:', res);
            this.getCategories(res.examid)
            if (res && typeof res === 'object') {
              // Convert the object to an array
              this.sinavlar = [res]
              
            } else {
              console.error('Response is not an object:', res);
            }
          },
          (error: any) => {
            console.error('basarisiz istek', error);
          }
        )

      }
    }
  }

  dropdownToggle() {
    this.isOpen = !this.isOpen;
  }

  // filter(event: any) {
  //   let sonuc = event.target.innerText;

  //   switch (sonuc) {
  //     case 'KONULAR':
  //       this.filteredCategories = this.categories.filter(category => category.parentid == '50f8882f-ac66-4e5f-9756-5fa3b7958996')
  //       break;
  //     case 'ÇIKMIŞ SORULAR':
  //       this.filteredCategories = this.categories.filter(category => category.parentid == 'e02a5db0-5d15-4c73-b1d6-80ea6d1f5b10')
  //       break;
  //   }

  // }

  changeTab(event: any) {
    let sonuc = event.route
    switch (sonuc) {
      case 'subjects':
        this.filteredExams = this.categories.filter(category => category.parentid == '50f8882f-ac66-4e5f-9756-5fa3b7958996')
        break;
      case 'exams':
        this.filteredExams = this.categories.filter(category => category.parentid == 'e02a5db0-5d15-4c73-b1d6-80ea6d1f5b10')
        break;
    }
    this.pageNumber = 1;
  }

  openRegisterModal() {
    this.dialogservice.openModal(RegisterExamComponent, true, true)
  }
}
