
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { DoctorsForAllSpecializations } from '../types/DoctorsForAllSpecializations';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { phoneNumberLengthValidator } from '../services/registerPhoneNumber';
import { passwordValidators } from '../services/password.service';
import { NgToastService } from 'ng-angular-popup';
import {RegisterPatientDto} from '../Types/RegisterPatientDto';
import { registrationService } from '../services/registration.service';


@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent{

  errorMessage:string ='';

  RegisterPatient : RegisterPatientDto = 
  {
    phoneNumber: '',
    name: '',
    gender: '',
    dateOfBirth: '',
    password: '',
  };
  form = new FormGroup ({
    name : new FormControl<string>('',[Validators.required , Validators.minLength(3)]),
    phoneNumber : new FormControl<string>('0', [Validators.required, phoneNumberLengthValidator, this.onlyNumbersValidator]),
    dateOfBirth : new FormControl<string>('',[Validators.required]),
    password : new FormControl<string>('',[
      Validators.required,
      passwordValidators['PasswordTooShort'],
      passwordValidators['PasswordRequiresNonAlphanumeric'],
      passwordValidators['PasswordRequiresDigit'],
      passwordValidators['PasswordRequiresUpper'],
      passwordValidators['PasswordRequiresLower']
    ]),
    gender :  new FormControl<string>('',[Validators.required]),
  });

  constructor(private registrationService : registrationService, 
    private router : Router,
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

    this.RegisterPatient  = 
    {
        name : this.form.controls.name.value!,
        dateOfBirth : this.form.controls.dateOfBirth.value!,
        phoneNumber : this.form.controls.phoneNumber.value!,
        gender : this.form.controls.gender.value!,
        password : this.form.controls.password.value!,
    };
  
      this.registrationService.registerPatient(this.RegisterPatient).subscribe({
        next: () => {
          this.showSuccess();
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = 'The phone number you entered is already associated with an account.';
          }else {
            console.log('Some other error occurred:', error);
          }
        }
      });
     }
     private showSuccess() {
      this.toast.success({ detail: "SUCCESS", summary: 'Patient added successfully', duration: 9000 });
   }
  
  }