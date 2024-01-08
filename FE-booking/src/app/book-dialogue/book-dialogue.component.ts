import { Component, Inject, OnInit } from '@angular/core';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { AddPatientVisitDto } from '../Types/AddPatientVisitDto';
import { DoctorService } from '../services/doctor.service';
import { VisitCountDto } from '../Types/VisitCountDto';
import { GetAllPatientsWithDateDto } from '../Types/GetAllPatientWithDateDto';
import { ContinueBookingService } from '../services/continue-booking.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetPatientByPhoneDTO } from '../Types/GetPatientByPhoneDto';
import { TokenDto } from '../Types/TokenDto';
@Component({
  selector: 'app-book-dialogue',
  templateUrl: './book-dialogue.component.html',
  styleUrls: ['./book-dialogue.component.css']
})
export class BookDialogueComponent implements OnInit{
  doctorById? : GetDoctorByIDDto;
  id? : string ;
  visitCount? : VisitCountDto;
  PatientByPhoneNumber? : GetPatientByPhoneDTO;
  PatientPhoneNumber? : string;
  getAllPatientsWithDate?: GetAllPatientsWithDateDto[];
  patientAlreadyBooked : boolean = false;
  patient? : GetAllPatientsWithDateDto;
  patientRegistered?: Boolean = undefined;
  isLoogedIn? :boolean;
  token?: string;

  visitCountsModal : 
  {id: number;
   date: string;
   limitOfPatients: number;
   actualNoOfPatients: number;
   doctorId: string | null;
   weekScheduleId : number;
   day : number;
 }[] = [];
 visitCountsDrById : 
 {id: number;
  date: string;
  limitOfPatients: number;
  actualNoOfPatients: number;
  doctorId: string | null;
  weekScheduleId : number;
  day : number;
}[] = [];
 bookedDate : string = ' '
  constructor(private dialog : DoctorDialogueService, 
    @Inject(MAT_DIALOG_DATA) public data : any , 
    private PatientService : PatientService, 
    private doctorService : DoctorService
  , private ContinueBookingService : ContinueBookingService,){}
 
  ngOnInit(): void {
    
  }
  //#endregion

  Form = new FormGroup({
    phoneNumber : new FormControl<string>('')
  });


  handleSubmit(e: Event){
    e.preventDefault;
  }

  getPhoneNumber(e: Event){
    this.patientAlreadyBooked = false;
    this.patientRegistered= false;
    let day = this.data.date.split('/')[1]
    let month = this.data.date.split('/')[0]
    let year = this.data.date.split('/')[2]
    // console.log(day)
    let formattedDate  = `${year}-${month}-${day}`

    this.PatientPhoneNumber = (e.target as HTMLInputElement).value;
    
    this.PatientService.getPatientByPhoneNumber(this.PatientPhoneNumber!).subscribe({
      next:(PatientByPhoneNumber) => {
        this.PatientByPhoneNumber = PatientByPhoneNumber;
        this.patientRegistered = true;
      },
      error: (error) => {
       console.log('calling Patient api failed', error);
       this.PatientByPhoneNumber = {
        id : ' ',
        name : ' ',
        phoneNumber: ' ',
        dateOfBirth : ' ',
        gender : ' '

      }
     
      },
    });  

   this.getAllPatientVisits(formattedDate,this.data.data.id)
  }

  getAllPatientVisits(date : string , drId : string){
    
    this.PatientService.GetAllPatientWithVisitDate(date,drId).subscribe({
      next:(getAllPatientsWithDate) => {
        this.getAllPatientsWithDate = getAllPatientsWithDate;
        this.getAllPatientsWithDate?.forEach((patient)=>{
          if(patient.patientId==this.PatientByPhoneNumber?.id){
            this.patientAlreadyBooked = true;
            
            console.log(this.PatientByPhoneNumber.id)
            this.bookedDate=date
            console.log(this.bookedDate)
            console.log(this.patientAlreadyBooked)

          }
        })
      },
      error: (error) => {
       
        console.log('calling get patients with date api failed', error);
      },
    });
  }
  onContinue(doctor:any,date : string , patient? : GetPatientByPhoneDTO){
    // var ref = this.ContinueBookingService.open(doctor,date,patient)
    // console.log(date)
  }

  loginAndRegister(data:any){
    this.dialog.sendDataToLoginOrRegister(data,true)
    this.dialog.close()
  }
  close(){
    this.dialog.close()
  }
}
