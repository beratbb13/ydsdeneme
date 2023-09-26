import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { ToastService } from 'src/app/services/toastService/toast.service';
import { UserService } from 'src/app/services/userService/user.service';
import { Router } from '@angular/router';


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
    private router: Router) { }

  formGroup!: FormGroup
  loginFormValues: any = {}


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    })
  }

  onSubmit() {
    this.spinnerService.show();
    if (this.formGroup.valid) {
      Object.assign(this.loginFormValues, this.formGroup.value);
      this.userService.getUserByUserName(this.loginFormValues.username).subscribe(res => {
        if (res && res.password_ === this.loginFormValues.password) {
          this.toastService.showToast('success', 'Giriş işlemi başarılı');
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.router.navigate(['/']);
        } else if (res) {
          this.toastService.showToast('danger', 'Şifrenizi yanlış girdiniz. Lütfen tekrar deneyin.');
        } else {
          this.toastService.showToast('warning', 'Böyle bir hesap bulunmuyor.');
        }
      });
    } else {
      this.toastService.showToast('warning', 'Lütfen formu düzgün bir şekilde doldurunuz.');
    }
    this.spinnerService.hide();
  }
}
