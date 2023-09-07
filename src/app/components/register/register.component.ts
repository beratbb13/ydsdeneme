import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder) { }

  formGroup!: FormGroup;
  registerFormValues: any = {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, , Validators.minLength(5)]],
      phonenumber: ['', [Validators.minLength(10), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      Object.assign(this.registerFormValues, this.formGroup.value);
      console.log(this.registerFormValues);
    }
  }
}
