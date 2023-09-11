import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
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
    private router: Router) { }

  formGroup!: FormGroup;

  users: user[] = []

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, , Validators.minLength(5), Validators.maxLength(20)]],
      phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
    })

    this.getUsers()
  }

  getUsers() {
    //this.userService.users.subscribe(res => this.users = res)
    //this.users.map(res => console.log(res))
    this.userService.getUsers().subscribe(res => this.users = res.message)
  }

  onSubmit() {
    this.spinnerService.show();

    if (this.formGroup.valid) {
      let insertUser: any = {};
      Object.assign(insertUser, this.formGroup.value);

      let isSame = this.users.some((user: user) => {
        user.username == insertUser.username && user.email == insertUser.email;
      })

      if (!isSame) {
        this.userService.insertUser(insertUser).subscribe((res: any) => {
          if (res == 'Success') {
            this.toastService.showToast('success', 'Kayıt oluşturma işlemi başarılı.');
            this.formGroup.reset()
            this.router.navigate(['/']);
          }
          else {
            this.toastService.showToast('danger', 'Kayıt oluşturulurken bir hatayla karşılaşıldı.');
          }
        });
      } else {
        this.toastService.showToast('warning', 'Bu kullanıcı adıyla kayıtlı bir kullanıcı bulunuyor.');
      }
    }
    else {
      this.toastService.showToast('warning', 'Lütfen formu düzgün bir şekilde doldurunuz.');
      console.log(this.formGroup.controls)
    }
    this.spinnerService.hide();
  }
}
