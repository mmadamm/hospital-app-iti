import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { LoginDto } from '../../types/LoginDto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Token } from '@angular/compiler';
import { phoneNumberLengthValidator } from 'src/app/services/loginPhonNumber.serrvice';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  credentials: LoginDto = {phoneNumber : '', password: ''};
  rememberMe!: boolean;
  selctedOption?: string;
  errorrString?: string;

  constructor(private authenticationService: AuthenticationService,
    private router: Router){}
  ngOnInit(): void {
    localStorage.removeItem('DoctorId');
  }
  form = new FormGroup({
    username: new FormControl<string>('' , [Validators.required ,  phoneNumberLengthValidator , this.onlyNumbersValidator]),
    password: new FormControl<string>('' , [Validators.required]),
    isRememberable: new FormControl<boolean>(false)
  });

  onlyNumbersValidator(control:any) {
    const numericInputValue = control.value;
    const isValid = /^\d+$/.test(numericInputValue);

    return isValid ? null : { 'invalidNumber': true };
  }

 

  togglePasswordType(e:any) {
    const passwordControl = this.form.get('password');
    if (passwordControl instanceof FormControl) {
      const inputElement = document.getElementById('yourPassword') as HTMLInputElement;
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
  

  handleLogin(e: Event){
    e.preventDefault();
    // console.log(this.form.controls.isRememberable.value)
    this.rememberMe = this.form.controls.isRememberable.value!;
    // console.log(this.form.controls..value)
   // var credentials = new LoginDto();
    this.credentials!.phoneNumber = this.form.controls.username.value?? '';
    this.credentials!.password = this.form.controls.password.value ?? '';

    if(this.selctedOption == 'Admin'){
      this.authenticationService.login(this.credentials! , this.rememberMe).subscribe({
        next:(token) => {
        
        this.authenticationService.PhoneNumber =  this.credentials!.phoneNumber;
        this.router.navigate(['/dashboard'])
      },error:(error) => {
        console.log('calling admin login api faild', error.error)
        this.errorrString = error.error
      }
    });
    }else if(this.selctedOption == 'Doctor'){
      this.authenticationService.Doctorlogin(this.credentials! , this.rememberMe).subscribe({
        next:(token) => {
        this.authenticationService.PhoneNumber =  this.credentials!.phoneNumber;
        this.router.navigate(['/dashboard'])
      }, error:(error) => {
        console.log('calling Doctor login api faild', error.error)
        this.errorrString = error.error
        
      }
    });
    }else if(this.selctedOption == 'Reception'){
      this.authenticationService.receptionLogin(this.credentials! , this.rememberMe).subscribe({
        next:(token) => {
        this.authenticationService.PhoneNumber =  this.credentials!.phoneNumber;
        this.router.navigate(['/dashboard'])
      }, error:(error) => {
        console.log('calling Reception login api faild', error.error)
        this.errorrString = error.error
      }
    });
    
    }else{
      this.errorrString = 'Please Chose your Role'
    }
    
  }

  onSelect(e: Event){
    this.selctedOption = (e.target as HTMLInputElement).value
  }



  get formVal() {
    return this.form.controls;
  }
  
}
