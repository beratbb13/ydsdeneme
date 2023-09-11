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

  exam: exam[] = [
    {
      examid: '1sdgv23',
      name: 'berat',
      description: 'deneme',
      category: 'ingilizce'
    },
    {
      examid: '1234646',
      name: 'furkan',
      description: 'demo',
      category: 'matematik'
    },
    {
      examid: '123',
      name: 'berat',
      description: 'deneme',
      category: 'ingilizce'
    },
    {
      examid: '1234646',
      name: 'furkan',
      description: 'demo',
      category: 'matematik'
    },
    {
      examid: '12asv3',
      name: 'berat',
      description: 'deneme',
      category: 'ingilizce'
    },
    {
      examid: '123464hg456',
      name: 'furkan',
      description: 'demo',
      category: 'matematik'
    },
    {
      examid: 'dfhvc123',
      name: 'adem',
      description: 'deneme',
      category: 'ingilizce'
    },
    {
      examid: '1235645646',
      name: 'boran',
      description: 'demo',
      category: 'matematik'
    },
    {
      examid: '123256q34646',
      name: 'alper',
      description: 'demo',
      category: 'matematik'
    },
    {
      examid: '126574653',
      name: 'murat',
      description: 'deneme',
      category: 'ingilizce'
    },
    {
      examid: '1234wgs646',
      name: 'deneme',
      description: 'demo',
      category: 'matematik'
    },
    {
      examid: '1yugjh23',
      name: 'salih',
      description: 'deneme',
      category: 'ingilizce'
    },
    {
      examid: '1234646',
      name: 'gökalp',
      description: 'demo',
      category: 'matematik'
    },
    {
      examid: '12b34v3',
      name: 'sabri',
      description: 'deneme',
      category: 'ingilizce'
    },
    {
      examid: '1234646',
      name: 'furkan',
      description: 'demo',
      category: 'matematik'
    },
  ]

  listExams() {
    /*this.examService.getExams().subscribe(res => {
      if (res)
        this.exams = res;
      // this.questions.map((question: question) => {
        // if (!this.categoryids.includes(question.ecategoryid))
       //    this.categoryids.push(question.ecategoryid);
       })
    })*/
    this.exams = this.exam
  }

  //dbeaverda bir exam table olustur sonra bussionda datastore olustur


  getExam(cexam: any) {
    /*this.examService.getExamById(examid).subscribe(res => {
      console.log(res);
      this.router.navigate(['/examform'], res);
    })*/
    let navigationExtras: NavigationExtras = {
      state: {
        exam: this.exams.filter((exam: exam) => exam.examid === cexam.examid)
      }
    };

    this.router.navigate(['/homepage/examform'], navigationExtras);


  }
}
