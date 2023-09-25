import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterUser, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/authService/auth.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { ToastService } from 'src/app/services/toastService/toast.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService) { }

  formGroup!: FormGroup;



  regiterUser: RegisterUser = {
    User: {
      avatar: "",
      userId: "",
      lastLogin: new Date().toISOString(),
      accountStatus: 1,
      language: "English",
      activeDashboards: [],
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      domain: "155152",
      token: ""
    },
    Roles: [
    ],
    Groups: [
      "77446462155235631226"
    ]
  }

  insertUser: User = {
    user_id: '',
    user_name: '',
    name_: '',
    surname_: '',
    password_: '',
    email_: '',
    phone_number: '',
    birth_date: ''
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name_: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      surname_: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      password_: ['', [Validators.required, , Validators.minLength(5), Validators.maxLength(20)]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      email_: ['', [Validators.required, Validators.email]],
      birth_date: ['', [Validators.required]],
    })


  }



  onSubmit() {
    this.spinnerService.show();

    // if (this.formGroup.valid) {

    Object.assign(this.insertUser, this.formGroup.value);
    this.regiterUser.User.password = this.formGroup.value.password_
    this.regiterUser.User.firstName = this.formGroup.value.name_
    this.regiterUser.User.lastName = this.formGroup.value.surname_
    this.regiterUser.User.email = this.formGroup.value.email_
    this.insertUser.user_name = this.formGroup.value.email_


    this.register(this.regiterUser, this.insertUser)
    this.spinnerService.hide();
  }


  register(user: RegisterUser, insertUser: User) {
    this.authService.register(user).subscribe(res => {
      if (res.result) {
        this.toastService.showToast('success', 'Kayıt oluşturma işlemi başarılı.');
        this.authService.login({ Username: user.User.email, Password: user.User.password }).subscribe(res => {
          this.insertUserDb(insertUser)
          this.router.navigate(['/choose']);
        })
      }
      else {
        this.toastService.showToast('danger', res.message);
      }
    })
  }

  insertUserDb(insertUser: User) {
    this.userService.insertUser(insertUser).subscribe(res => {

    })
  }

  redirectLogin() {
    this.router.navigate(['login'])
  }
}
