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
  styleUrls: ['./exam-filter.component.css']
})
export class ExamFilterComponent implements OnInit {

  buttontext!: string
  selectedCategory: string = ''; // Kullanıcının seçtiği kategori
  filteredExams: any[] = []; // Filtrelenmiş sınavlar

  exams: any

  constructor(private answerService: AnswerService,
    private examCategoryService: ExamCategoryService,
    private questionService: QuestionService,
    private spinnerService: SpinnerService,
    private router: Router) {

  }

  pageNumber: number = 1;
  questions: question[] = [];
  categories: any[] = [];
  ngOnInit(): void {

    this.getCategories()
  }

  getCategories() {
    this.spinnerService.show();
    this.examCategoryService.getCategories().pipe(
      tap(res => this.categories = res),
    ).subscribe(() => this.spinnerService.hide());
  }

  getExam(category: string) {
    const navigationExtras: NavigationExtras = {
      state: { category: category }
    };

    this.router.navigate(['/homepage/examform'], navigationExtras);
  }

  isOpen: boolean = false;

  dropdownToggle() {
    this.isOpen = !this.isOpen;
  }

  // filterByCategory() {
  //   // Seçilen kategoriye göre sınavları filtreleme

  //   if (this.selectedCategory) {
  //     this.filteredExams = this.categories.filter(
  //       (exam: any) => exam.Name === this.selectedCategory
  //     );
  //   } else {
  //     this.filteredExams = this.exams;
  //   }
  // }

}
