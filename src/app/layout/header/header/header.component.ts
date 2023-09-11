import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/services/authService/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currentUser!: user;

  ngOnInit() {
    let temp = localStorage.getItem('currentUser')
    this.currentUser = temp ? JSON.parse(temp) : [];
  }

  constructor(private router: Router,
    private authService: AuthService) { }


  logOut() {
    this.authService.getLogout().subscribe(res => console.log(res));
    this.router.navigate(['/']);
  }

  navigate(path: string) {
    this.router.navigate([path])
  }
}
