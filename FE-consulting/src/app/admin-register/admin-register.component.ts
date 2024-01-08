
import { Component, OnInit } from '@angular/core';
import { registrationService } from '../services/registration.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterAdminDto } from '../Types/RegisterAdminDto';
import { NgModule }      from '@angular/core';
import { Router } from '@angular/router';
import { phoneNumberLengthValidator } from '../services/registerPhoneNumber';
import { passwordValidators } from '../services/password.service';
import { NgToastService } from 'ng-angular-popup';
import { DoctorService } from '../services/doctor.service';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  specializations?: GetAllSpecializationsDto[];
  selectedSpecializationId: number = 0;
  errorMessage: string = '';

  RegisterAdminDto: RegisterAdminDto = {
    name: '',
    phoneNumber: '',
    password: '',
    specializationId: 0, 
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
    specializationId: new FormControl<number | null>(null, [Validators.required]),
    
  });

  constructor(
    private registrationService: registrationService, 
    private router: Router,
    private toast: NgToastService,private doctorService : DoctorService, 
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
  
  ngOnInit(): void {
    this.doctorService.GetAllSpecializations().subscribe({
      next:(specializations) => {
      // console.log('Response:', specializations);
        this.specializations = specializations;
        
      },
      error: (error) => {
        console.log('calling All specializations api failed', error);
      },
    })
  }

  onSubmit(e: Event) {
    e.preventDefault();
  
    this.RegisterAdminDto = {
      name: this.form.get('name')!.value,
      phoneNumber: this.form.get('phoneNumber')!.value,
      password: this.form.get('password')!.value,
      specializationId: +this.selectedSpecializationId
    };
  
    console.log(this.RegisterAdminDto);
  
    this.registrationService.registerAdmin(this.RegisterAdminDto).subscribe({
      next: () => {
        this.showSuccess();
      },
      error: (error) => {

        if (error.status === 400) {
          this.errorMessage = '*The phone number you entered is already connected to an admin.';
        } else if (error.status === 500) {
          this.errorMessage = '*This specialization already has an admin.';
        } else {
          console.log('Some other error occurred:', error);
        }
      }
    });
  }
  
  private showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: `Admin ${this.RegisterAdminDto.name} added successfully`, duration: 9000 });
  }
  onSelect(event: any) {
  this.selectedSpecializationId = (event.target as any).value;
    console.log(this.selectedSpecializationId)
  }

}