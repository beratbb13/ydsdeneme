import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { json } from 'body-parser';
import { ExamCategoryService } from 'src/app/services/examCategoryService/exam-category.service';
import { UserScoreService } from 'src/app/services/userScoreService/user-score.service';
import { UserService } from 'src/app/services/userService/user.service';
import { Router } from '@angular/router'
import { tap } from 'rxjs'
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  selectedDate: any = new Date().toISOString().split('T')[0]
  user_id: string = ''
  performs: any[] = []
  filteredPerforms: any[] = []

  constructor(private sidebarService: NbSidebarService,
    private userservice: UserService,
    private userScoreService: UserScoreService,
    private examCategoryService: ExamCategoryService,
    private dialogService: DialogService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.getUserId()
    this.getUserCourses(this.user_id)
    this.getRegisteredCourses()
  }

  getUserId() {
    const user = localStorage.getItem('user')
    if (user) {
      const jsonuser = JSON.parse(user)
      if (jsonuser) {
        this.user_id = jsonuser.userId
        console.log(this.user_id)
        this.getCategoryPerforms()
      }
    } else {
      console.error('userid mevcut degil!')
    }
  }

  goExam(examname: any) {
    switch (examname) {
      case 'YDS':
        this.router.navigate(['/user/exams'])
        break;
      case 'LGS':
        // this.router.navigate(['/user/deneme'])
        break;
      case 'KPSS':
        // this.router.navigate(['/user/deneme'])
        break;
      case 'ALES':
        // this.router.navigate(['/user/deneme'])
        break;

      default:
        break;
    }
  }

  kurslar: any[] = []
  getRegisteredCourses() {
    /*this.examCategoryService.getUsersCourse(this.user_id).subscribe(
      (res: any) => {
        this.kurslar = res;
        console.log('KURSLAAAR', this.kurslar)
      },
      (error: any) => {
        console.error('Hata oluştu', error);
      }
    )*/
  }


  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  userCourses: any[] = [];
  sinavAdlari: string[] = [];

  getUserCourses(userId: string) {
    this.userservice.getUserIDfromCourses(userId).subscribe((res: any) => {
      this.userCourses = Array.isArray(res) ? res : [res];
      console.log(this.userCourses);

      // Kullanıcı kimliğine göre verileri filtrele
      const filteredUserCourses = this.filterUserCoursesByUserId(userId, this.userCourses);

      if (filteredUserCourses.length > 0) {
        const examIds = filteredUserCourses.map(course => course.examid); // Tüm kursların examid'lerini aldık
        console.log(`Kullanıcının katıldığı tüm sınavların examid'leri: ${examIds}`);

        // examid'ye göre sinav adını döndüren bir işlev kullanın
        examIds.forEach(examid => {
          const sinavAdi = this.getSinavAdi(examid);
          this.sinavAdlari.push(sinavAdi); // Sinav adini sinavAdlari dizisine ekleyin
          console.log(`Kullanıcının katıldığı sınav adları: ${this.sinavAdlari}`);
        });
      }
    });
  }

  filterUserCoursesByUserId(userId: string, userCourses: any[]): any[] {
    return userCourses.filter(course => course.userid === userId);
  }

  getSinavAdi(examid: any): string {
    if (examid === '6e6e28f6-5df0-4da5-9e29-53a91dbb0e9c') {
      return 'YDS';
    }
    //  else if (examid === 2) {
    //   return 'YGS';
    // } else if (examid === 3) {
    //   return 'LYS';
    // } 
    else {
      return 'Bilinmeyen Sinav';
    }
  }


  setDate() {
    this.userScoreService.getExamScoresByUserIdAndDate(this.user_id, this.selectedDate).subscribe(res => this.filteredPerforms = res)
  }


  getCategoryPerforms() {
    this.userScoreService.getExamScoresByUserId(this.user_id).pipe(
      tap(res => this.performs = res),
    ).subscribe(() => this.setDate())
  }

  openExamResultDetailModal(performs: any) {
    this.dialogService.openExamResultDetailModal(performs).onClose.subscribe()
  }
}
