import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

import { AuthService } from 'src/app/services/authService/auth.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  selectedButton: string | null = null;


  constructor(private spinnerService: SpinnerService,
    private authService: AuthService,
    private userService: UserService) { }

  currentUser!: User;

  ngOnInit() {
    this.selectedButton = this.authService.getSelectedButton();

    if (history.state.user) {
      this.currentUser = history.state.user;
      console.log(history.state.user);
    }
  }

  logOut() {
    this.authService.getLogout().subscribe(res => console.log(res))
  }

  deleteUSER() {
    this.userService.deleteUser('qqqqq').subscribe(res => console.log(res))
  }
}

