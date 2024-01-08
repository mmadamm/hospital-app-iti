import { Component, Inject } from '@angular/core';
import { GetDoctorByIDDto } from '../types/GetDoctorrByIDDto';
import { VisitCountDto } from '../types/VisitCountDto';
import { GetPatientByPhoneDTO } from '../types/GetPatientByPhoneNumberDto';
import { GetAllPatientsWithDateDto } from '../types/GetAllPatientsWithDateDto';
import { DoctorDialogService } from '../services/doctor-dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../services/patientByPhoneNumber.service';
import { DoctorService } from '../services/doctor.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PatientService2 } from '../services/patient.service';
import { AddPatientVisitDto } from '../types/AddPatientVisitDto';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-book-dialog1',
  templateUrl: './book-dialog1.component.html',
  styleUrls: ['./book-dialog1.component.css']
})
export class BookDialog1Component {
  doctorById? : GetDoctorByIDDto;
  id? : string ;
  visitCount? : VisitCountDto;
  PatientByPhoneNumber? : GetPatientByPhoneDTO;
  PatientPhoneNumber? : string;
  getAllPatientsWithDate?: GetAllPatientsWithDateDto[];
  patientAlreadyBooked : boolean = false;
  patient? : GetAllPatientsWithDateDto;
  patientRegistered? : boolean = false;
  showNotRegisteredMsg: boolean = false;

  addPatientVisit? : AddPatientVisitDto
    
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
    date : string = ''
  constructor(private dialog : DoctorDialogService, 
    @Inject(MAT_DIALOG_DATA) public data : any , 
    private PatientService : PatientService2,
    private router: Router, private toast: NgToastService){}

  Form = new FormGroup({
    phoneNumber : new FormControl<string>('')
  });


  handleSubmit(e: Event){
    e.preventDefault;
  

  }
  private showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: `Visit added successfully on ${this.date} with Dr. ${this.data.data.name}`, duration: 9000 });
  }
  getPhoneNumber(e: Event){
    
    this.patientAlreadyBooked = false;
    this.patientRegistered= false;

    let day = this.data.date.split('/')[1]
    let month = this.data.date.split('/')[0]
    let year = this.data.date.split('/')[2]
    
    let formattedDate  = `${year}-${month}-${day}`
    this.date = formattedDate
    this.PatientPhoneNumber = (e.target as HTMLInputElement).value;
    console.log(this.PatientPhoneNumber)
    this.PatientService.getPatientByPhoneNumber(this.PatientPhoneNumber!).subscribe({
      next:(PatientByPhoneNumber) => {
        this.PatientByPhoneNumber = PatientByPhoneNumber;
        this.patientRegistered = true;
        this.showNotRegisteredMsg = false;
      },
      error: (error) => {
       console.log('calling Patient api failed', error);
       this.showNotRegisteredMsg = true;
       this.PatientByPhoneNumber = {
        id : ' ',
        name : ' ',
        phoneNumber: ' ',
        dateOfBirth : ' ',
        gender : ' '

      }
      },
    }); 

    this.PatientService.GetAllPatientWithVisitDate(formattedDate,this.data.data.id).subscribe({
      next:(getAllPatientsWithDate) => {
        this.getAllPatientsWithDate = getAllPatientsWithDate;
        this.getAllPatientsWithDate?.forEach((patient)=>{
          if(patient.patientId==this.PatientByPhoneNumber?.id){
            this.patientAlreadyBooked = true;
           
            // console.log(this.PatientByPhoneNumber?.id)
            this.bookedDate=formattedDate
            // console.log(this.bookedDate)
          }
        })
      },
      error: (error) => {
       
        console.log('calling get patients with date api failed', error);
      },
    }); 

   
  }
 

      bookVisit(doctor: GetDoctorByIDDto, patient:GetPatientByPhoneDTO, date : string){
        let day  = date.split('/')[1]
        let month = date.split('/')[0]
        let year = date.split('/')[2]
        let formattedDate  = `${year}-${month}-${day}`
         this.addPatientVisit ={
          doctorId : doctor.id,
          patientId : patient.id,
          dateOfVisit : formattedDate,
        }
        console.log(this.addPatientVisit)
        this.PatientService.addPatientVisit(this.addPatientVisit).subscribe({
          next :  ()=>{
            this.showSuccess()

            console.log("done")         
          },

          error:(error)=>{
            console.error("calling addVisit api failed",error);
          }
            
          });
          
        }
}