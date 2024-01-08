
import { Component, OnInit } from '@angular/core';
import { registrationService } from '../services/registration.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReceptionRegisterDto } from '../Types/RegisterReceptionDto';
import { NgModule }      from '@angular/core';
import { Router } from '@angular/router';
import { phoneNumberLengthValidator } from '../services/registerPhoneNumber';
import { passwordValidators } from '../services/password.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reception-register',
  templateUrl: './reception-register.component.html',
  styleUrls: ['./reception-register.component.css']
})
export class ReceptionRegisterComponent {
  errorMessage: string = '';
  
  RegisterReception: ReceptionRegisterDto = {
    name: '',
    phoneNumber: '',
    password: '',
  };

  form = new FormGroup({
    name: new FormControl<string>('',[Validators.required , Validators.minLength(3)]),
    phoneNumber: new FormControl<string>('', [Validators.required, phoneNumberLengthValidator , this.onlyNumbersValidator]),
    password: new FormControl<string>('', [
      Validators.required,
      passwordValidators['PasswordTooShort'],
      passwordValidators['PasswordRequiresNonAlphanumeric'],
      passwordValidators['PasswordRequiresDigit'],
      passwordValidators['PasswordRequiresUpper'],
      passwordValidators['PasswordRequiresLower']
    ]),
  });

  constructor(
    private registrationService: registrationService, 
    private router: Router,
    private toast: NgToastService
  ) {}

  onlyNumbersValidator(control:any) {
    const numericInputValue = control.value;
    const isValid = /^\d+$/.test(numericInputValue);

    return isValid ? null : { 'invalidNumber': true };
  }

  togglePasswordType(e:any) {
    const passwordControl = this.form.get('password');

    if (passwordControl instanceof FormControl) {
      const inputElement = document.getElementById('password') as HTMLInputElement;

      if (inputElement) {
        const currentType =inputElement.type;
        const newType = currentType === 'password' ? 'text' : 'password';
        inputElement.type = newType;
      }
    }
    const I = e.target as HTMLElement
    if(I.style.color === "rgb(13, 110, 253)"){
      I.style.color = "black"
    }else{
      I.style.color = "#0d6efd"
    }
  }
  
  onSubmit(e: Event) {
    e.preventDefault();

    this.RegisterReception = {
      name: this.form.get('name')!.value,
      phoneNumber: this.form.get('phoneNumber')!.value,
      password: this.form.get('password')!.value,
    };

    this.registrationService.registerReception(this.RegisterReception).subscribe({
      next: () => {
        this.showSuccess();
      },
      error: (error) => {

        if (error.status === 400) {
          this.errorMessage = '*The phone number you entered is already associated with a receptionist.';
        } else {
          console.log('Some other error occurred:', error);
        }
      }
    });
   }
   private showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: `Receptionist ${this.RegisterReception.name} added successfully`, duration: 4000 });
 }

}