import { Component, Input, OnInit } from '@angular/core';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.css']
})
export class ExamCardComponent implements OnInit{
  @Input() cardInfo: any

  sinavlar:any[]=[]

  constructor(private examCategoryService:ExamCategoryService){ }

  ngOnInit(): void {

  }

  getSinavResmi(sinavAdi: string): string {
    let resimURL: string = '';

    switch (sinavAdi) {
      case 'YDS':
        resimURL = '/assets/icons/yds.png';
        break;
      case 'LGS':
        resimURL = '/assets/icons/lgs.png';
        break;
      case 'KPSS':
        resimURL = '/assets/icons/kpss.png';
        break;
      case 'ALES':
        resimURL = '/assets/icons/ales.png';
        break;
      case 'YGS':
        resimURL = '/assets/icons/ygs.png';
        break;
      default:
        resimURL = 'URL_VARSAYILAN_RESIM';
        break;
    }
  
    return resimURL;
  }

}