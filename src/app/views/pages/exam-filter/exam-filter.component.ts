import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { tap } from 'rxjs';
import { question } from 'src/app/models/question';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';
import { ExamService } from 'src/app/services/examService/exam.service';
import { QuestionService } from 'src/app/services/questionService/question.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';

@Component({
  selector: 'app-exam-filter',
  templateUrl: './exam-filter.component.html',
  styleUrls: ['./exam-filter.component.scss']
})
export class ExamFilterComponent implements OnInit {

  constructor(private answerService: AnswerService,
    private examCategoryService: ExamCategoryService,
    private questionService: QuestionService,
    private spinnerService: SpinnerService,
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

  ngOnInit(): void {

    this.getCategories()
  }

  getCategories() {
    this.spinnerService.show();
    this.examCategoryService.getCategories().pipe(
      tap(res => { this.categories = res; console.log(this.categories) }),
      tap(() => {
        this.filteredExams = this.categories.filter(category => category.parentid =='e02a5db0-5d15-4c73-b1d6-80ea6d1f5b10');
        this.filteredSubject = this.categories.filter(category => category.parentid ==  '50f8882f-ac66-4e5f-9756-5fa3b7958996')
        console.log(this.filteredExams,this.filteredSubject)
      })
    ).subscribe(() => this.spinnerService.hide());
  }

  getExam(category: string) {
    const navigationExtras: NavigationExtras = {
      state: { category: category }
    };

    this.router.navigate(['/user/examform'], navigationExtras);
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
}
