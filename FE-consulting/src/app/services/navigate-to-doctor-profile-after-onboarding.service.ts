import { Injectable, OnInit } from '@angular/core';
import { GetDoctorByPhoneDto } from '../types/GetDoctorByPhoneDto';
import { FormsComponent } from '../forms/forms.component';
import { DoctorService } from './doctor.service';
import { Router } from '@angular/router';
import { GetDoctorByIDForAdminDto } from '../types/GetDoctorByIDForAdminDto';
import { DataBetweenAddDrDrProfileService } from './data-between-add-dr-dr-profile.service';
import { AddWeekScheduleDto } from '../types/AddWeekScheduleDto';

@Injectable({
  providedIn: 'root'
})
export class NavigateToDoctorProfileAfterOnboardingService implements OnInit{

  phoneNumber? : string
  doctor? : GetDoctorByIDForAdminDto
  doctorId? : string
  schedule? : AddWeekScheduleDto
  constructor(
    private doctorService : DoctorService,
    private router : Router,
    private dataFromRegisterDr: DataBetweenAddDrDrProfileService) { }

  ngOnInit()  {
    this.dataFromRegisterDr.currentDoctorId.subscribe(doctorId=>this.doctorId=doctorId)

  }

  open(){
    
    this.doctorService.GetDoctorByPhone(this.phoneNumber!).subscribe({
      next:(doctor) => {
        this.doctor = doctor;
        
        this.doctorId = doctor.id!
        this.dataFromRegisterDr.changeDoctorId(this.doctorId)
        console.log(this.doctor)
        
        
           this.schedule = {
            id : 0,
            isAvailable : true,
            limitOfPatients : 0,
            startTime : "2000-01-01T00:00:00",
            endTime : "2000-01-01T00:00:00",
            doctorId : this.doctor.id!,
            dayOfWeek : 0
           }
     this.doctorService.addWeekSchedule(this.schedule).subscribe({
          next:()=>{
              //console.log("added")
              
              this.router.navigate(['/doctorProfile'])
          },
          error:(error)=>{
            console.log("add week schedule api failed",error);
          } })
        
        
       
       },
      error: (error) => {
        console.log('calling dr by id api failed', error);
      },
    });
    
  

  }
}
