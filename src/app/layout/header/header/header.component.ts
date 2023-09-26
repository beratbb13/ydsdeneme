import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  ngOnInit() {
    this.getUserName()
  }

  constructor(private router: Router,
    private authService: AuthService) { }


    loggedInUser: string=''

    getUserName() {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        try {
          const user = JSON.parse(currentUser);
          if (user.user_name) {
            this.loggedInUser = user.user_name;
          }
        } catch (error) {
          console.error('JSON parsing error:', error);
        }
      }
      console.log(this.loggedInUser);
    }
    
  
    logOut() {
      this.authService.getLogout().subscribe(res => console.log(res));
      localStorage.removeItem('currentUser')
      this.router.navigate(['/']);
    }
  
  
    goMain(){
      this.router.navigate(['/'])
    }
    
    goLogin(){
      this.router.navigate(['/login'])
    }
    goDashboard(){
      this.router.navigate(['/user'])
    }
}
