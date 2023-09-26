import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  constructor(private sidebarService: NbSidebarService) {
  }
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }


}
