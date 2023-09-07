import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder) { }

  formGroup!: FormGroup
  loginFormValues: any = {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      Object.assign(this.loginFormValues, this.formGroup.value);
      console.log(this.loginFormValues);
    }
  }
}
