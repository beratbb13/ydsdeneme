import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor() { }

  currentUser!: any;

  ngOnInit() {
    let temp = localStorage.getItem('currentUser');
    this.currentUser = temp ? JSON.parse(temp) : {};
  }

}
