import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { tap } from 'rxjs';
import { question } from 'src/app/models/question';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';

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
    private router: Router) { }

  exams = [
    { name: 'YDS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/yds.png' },
    { name: 'KPSS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/kpss.png' },
    { name: 'YGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ygs.png' },
    { name: 'ALES', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ales.png' },
    { name: 'LGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/lgs.png' },

  ]
  sinavlar: any[] = [];



  pageNumber: number = 1;
  questions: question[] = [];
  categories: any[] = [];
  filteredExams: any[] = [];
  isOpen: boolean = false;
  filteredSubject: any[] = []

  ngOnInit(): void {
    this.getRegisteredCoursesAndExams()
    this.getCategories()
  }

  getCategories() {
    this.spinnerService.show();
    this.examCategoryService.getCategories().pipe(
      tap(res => { this.categories = res; console.log(this.categories) }),
      tap(() => {
        this.filteredExams = this.categories.filter(category => category.parentid == '50f8882f-ac66-4e5f-9756-5fa3b7958996');
        //this.filteredSubject = this.categories.filter(category => category.parentid == '50f8882f-ac66-4e5f-9756-5fa3b7958996')
      })
    ).subscribe(() => this.spinnerService.hide());
  }

  getExam(category: string) {
    const navigationExtras: NavigationExtras = {
      state: { category: category }
    };

    this.router.navigate(['/user/examform'], navigationExtras);
  }

  getRegisteredCoursesAndExams(){
    const currentuser=localStorage.getItem('user')
    if ((currentuser !== null && currentuser !== undefined)){
      const userJSON=JSON.parse(currentuser)
      if (userJSON.userId) {
        const userid = userJSON.userId;
        // console.log('useerid',userid)
        this.examCategoryService.getUsersCourse(userid).subscribe(
          (res: any) => {
            console.log('Başarılı istek, alinan kurslar:', res);
          },
          (error: any) => {
            console.error('Hata oluştu', error);
          }
        )
        this.examCategoryService.getUsersExams(userid).subscribe(
          (res: any) => {
            console.log('Basarili Istek, alinan SINAVLAR:', res);
            // Eğer res bir nesne ise, bu nesneyi bir diziye dönüştürün.
            this.sinavlar = Object.values(res);
            console.log('agabababa', this.sinavlar);
          },
          (error: any) => {
            console.error('basarisiz istek', error);
          }
        );
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
}
