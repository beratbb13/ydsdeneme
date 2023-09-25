import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private spinnerService: SpinnerService) { }

  formGroup!: FormGroup
  forgetPasswordFormValues: any = {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      Object.assign(this.forgetPasswordFormValues, this.formGroup.value);
    } else {
    }
  }
  redirectLogin(){
    this.router.navigate(['login'])
  }
}
