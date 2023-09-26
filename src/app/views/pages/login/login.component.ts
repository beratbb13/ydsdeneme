import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { ToastService } from 'src/app/services/toastService/toast.service';
import { UserService } from 'src/app/services/userService/user.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  formGroup!: FormGroup
  loginFormValues: LoginRequest = { Username: '', Password: '' }
  rememberMe: string = 'false'

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      Username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      Password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],

    })
    this.isCheckedRemember()
  }

  isCheckedRemember() {
    if (localStorage.getItem('remember')){
      this.rememberMe='true'
      var userName=localStorage.getItem('Username')
      var password=localStorage.getItem('Password')
      this.formGroup.patchValue({
        Username:userName,
        Password:password
      })

    }
  }

  onSubmit() {
    this.spinnerService.show();
    if (this.rememberMe) {
      localStorage.setItem('Username', this.formGroup.value.Username)
      localStorage.setItem('Password', this.formGroup.value.Password)
      localStorage.setItem('remember', this.rememberMe)

    }
    if (this.formGroup.valid) {
      Object.assign(this.loginFormValues, this.formGroup.value);

      this.login(this.loginFormValues)

    } else {
      this.toastService.showToast('warning', 'Lütfen formu düzgün bir şekilde doldurunuz.');
    }
    this.spinnerService.hide();
  }


  login(loginReq: LoginRequest) {
    this.authService.login(loginReq).subscribe(res => {
      if (res.result) {
        this.toastService.showToast('success', 'Giriş işlemi başarılı');
        this.router.navigate(['user/dashboard']);
      } else if (res) {
        this.toastService.showToast('danger', 'Kullanıcı bilgilerinizi yanlış girdiniz. Lütfen tekrar deneyin.');
      } else {
        this.toastService.showToast('warning', 'Böyle bir hesap bulunmuyor.');
      }
    })
  }
}
