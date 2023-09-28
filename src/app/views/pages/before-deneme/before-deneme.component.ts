import { Component, OnInit } from '@angular/core';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';

@Component({
  selector: 'app-before-deneme',
  templateUrl: './before-deneme.component.html',
  styleUrls: ['./before-deneme.component.css']
})
export class BeforeDenemeComponent implements OnInit{
  selectedExam: string = ''; 
  // exams = [
  //   { name: 'YDS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/yds.png' },
  //   { name: 'KPSS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/kpss.png' },
  //   { name: 'YGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ygs.png' },
  //   { name: 'ALES', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/ales.png' },
  //   { name: 'LGS', text: 'lorem ipsum dolar sit amet', img: '/assets/icons/lgs.png' },

  // ]
  sinavlar:any[]=[]

  constructor(private examCategoryService:ExamCategoryService){}

  ngOnInit(): void {
    this.getRegisteredCoursesAndExams()
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
}
