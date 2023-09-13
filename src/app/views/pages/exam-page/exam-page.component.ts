import { Component } from '@angular/core';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { NavigationExtras, Router } from '@angular/router';
import { question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/questionService/question.service';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';
import { tap } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent {

  constructor(private answerService: AnswerService,
    private examCategoryService: ExamCategoryService,
    private questionService: QuestionService,
    private spinnerService: SpinnerService,
    private router: Router) { }

  pageNumber: number = 1;
  questions: question[] = [];
  categories: any[] = [];

  ngOnInit() {
    this.getCategories();
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

}
