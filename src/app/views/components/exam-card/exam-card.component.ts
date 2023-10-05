import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.css']
})
export class ExamCardComponent implements OnInit{
  @Input() cardInfo: any

  sinavlar:any[]=[]

  constructor(private examCategoryService:ExamCategoryService,
    private userservice:UserService,
    private dialogService:NbDialogService){ }

  ngOnInit(): void {
    // this.getRegisteredCoursesAndExams()
  }

  openConfirmationDialog(usercourseid:any) {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        message: 'Bu sınavı silmek istiyor musunuz?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        // silme işlemi
        this.silSinav(usercourseid)
        console.log('silindi')

      }
      // window.location.reload()
    });
  }

  silSinav(usercourseid: any) {
    this.userservice.deleteUserFromExam(usercourseid).subscribe(
      (response: any[]) => {
        if (response === undefined) {
          console.error('Silme işlemi sonrasında beklenen yanıt alınamadı.');
          // Hata işleme ekleyebilir veya uygun bir hata mesajı gösterebilirsiniz.
        } else {
          // Başarılı bir şekilde silindiğinde yapılacak işlemleri burada gerçekleştirin
          console.log('Sınav başarıyla silindi.');
  
          // Sayfadaki verileri güncelleme - Örnek olarak this.sinavlar dizisini güncelleyebilirsiniz
          this.sinavlar = this.sinavlar.filter(sinav => sinav.usercourseid !== usercourseid);
  
          // Sayfayı yenileme işlemini burada yapın, silme işlemi tamamlandığında
          window.location.reload();
        }
      },
      (error: any) => {
        // Hata durumunda yapılacak işlemleri burada gerçekleştirin
        console.error('Sınav silinirken hata oluştu:', error);
      }
    );
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
        );
      }
    }
  }
}