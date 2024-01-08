import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { GetDoctorByIDForAdminDto } from '../types/GetDoctorByIDForAdminDto';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-my-doctor-profile',
  templateUrl: './my-doctor-profile.component.html',
  styleUrls: ['./my-doctor-profile.component.css']
})
export class MyDoctorProfileComponent implements OnInit{
  doctor? : GetDoctorByIDForAdminDto;
  phoneNumber?: string;
  days = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday']

constructor(private doctorService:DoctorService,
  private authenticationService: AuthenticationService){}
  ngOnInit(): void {
    
    console.log(this.days[0])
    this.phoneNumber = localStorage.getItem('phoneNumber')!

    if(!this.phoneNumber){
      this.phoneNumber = this.authenticationService.PhoneNumber;
    }
    this.doctorService.GetDoctorByPhone(this.phoneNumber!).subscribe({
      next:(doctor) => {
        this.doctor = doctor
      },
      error:(error) => {
        console.log('calling get Doctor by phone number api faild', error);
      }
    })
  }


}
