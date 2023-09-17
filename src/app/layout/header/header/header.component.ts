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

    getUserName(){
      const currentUser=localStorage.getItem('currentUser')
      if (currentUser){
        const user=JSON.parse(currentUser);
        this.loggedInUser=user.user_name
      }
      console.log(this.loggedInUser)
    }

  logOut() {
    this.authService.getLogout().subscribe(res => console.log(res));
    this.router.navigate(['/']);
  }

  /*navigate(path: string) {
    debugger;
    this.router.navigate([path])
  }*/
}
