import { Component, OnInit } from '@angular/core';
import { Usercourse } from 'src/app/models/usercourse';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';

@Component({
  selector: 'app-before-deneme',
  templateUrl: './before-deneme.component.html',
  styleUrls: ['./before-deneme.component.css']
})
export class BeforeDenemeComponent implements OnInit {
  selectedExam: string = '';
  // exams = [
  //   { name: 'YDS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/yds.png' },
  //   { name: 'KPSS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/kpss.png' },
  //   { name: 'YGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ygs.png' },
  //   { name: 'ALES', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ales.png' },
  //   { name: 'LGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/lgs.png' },

  // ]
  sinavlar: Usercourse[] = []

  constructor(private examCategoryService: ExamCategoryService) { }

  ngOnInit(): void {
    this.getRegisteredCoursesAndExams()
  }

  getRegisteredCoursesAndExams() {
    const currentuser = localStorage.getItem('user')
    if ((currentuser !== null && currentuser !== undefined)) {
      const userJSON = JSON.parse(currentuser)
      if (userJSON.userId) {
        const userid = userJSON.userId;
        // console.log('useerid',userid)
        this.examCategoryService.getUsersCourse(userid).subscribe(
          (res: any) => {
            this.sinavlar = [res]
            console.log('Başarılı istek, alinan kurslar:', res);
          },
          (error: any) => {
            console.error('Hata oluştu', error);
          }
        )
        this.examCategoryService.getUsersExams(userid).subscribe(
          (res: any) => {
            console.log('Basarili Istek, alinan SINAVLAR:', res);

            if (res && typeof res === 'object') {
              // Convert the object to an array
              this.sinavlar = [res];
              console.log('agabababa', this.sinavlar);
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
}
