import { Component } from '@angular/core';
import { AnswerService } from 'src/app/services/answerService/answer.service';
import { exam } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/examService/exam.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent {

  constructor(private answerService: AnswerService,
    private examService: ExamService,
    private router: Router) { }

  exams: exam[] = [];
  pageNumber: number = 1;

  ngOnInit() {
    this.listExams();
  }

  listExams() {
    this.examService.getExams().subscribe(res => {
      if (res)
        this.exams = res.message;
    })
  }

  getExam(currentExam: exam) {
    /*this.examService.getExamById(examid).subscribe(res => {
      console.log(res);
      this.router.navigate(['/examform'], res);
    })*/
    let navigationExtras: NavigationExtras = {
      state: {
        exam: this.exams.filter((exam: exam) => exam.category === currentExam.category)
      }
    };

    this.router.navigate(['/homepage/examform'], navigationExtras);

  }
}
