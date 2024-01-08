import { Component, Inject, OnInit } from '@angular/core';
import { ContinueBookingService } from '../services/continue-booking.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';
import { PatientService } from '../services/patient.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';

import { AddPatientVisitDto } from '../Types/AddPatientVisitDto';
import { GetPatientByPhoneDTO } from '../Types/GetPatientByPhoneDto';

import { AppointmentsComponent } from '../appointments/appointments.component';
import { Router } from '@angular/router';
import { GetAllPatientsWithDateDto } from '../Types/GetAllPatientWithDateDto';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-continue-booking',
  templateUrl: './continue-booking.component.html',
  styleUrls: ['./continue-booking.component.css']
})
export class ContinueBookingComponent  implements OnInit{

  getAllPatientsWithDate?: GetAllPatientsWithDateDto[];

  
  constructor(@Inject(MAT_DIALOG_DATA) public data : any, 
  private dialog : ContinueBookingService,
  private firstDialog : DoctorDialogueService,
  private patientService : PatientService,
  private router : Router,
  private PatientService : PatientService,
  private toast: NgToastService ){
   
  }
  VisitsForPatient?: Boolean ;
  ngOnInit(): void {
    this.VisitsForPatient = false;
    let day  = this.data.date.split('/')[1]
    let month = this.data.date.split('/')[0]
    let year = this.data.date.split('/')[2]
    let formattedDate  = `${year}-${month}-${day}`
    this.PatientService.GetAllPatientWithVisitDate(formattedDate,this.data.doctor.id).subscribe({
      next:(getAllPatientsWithDate) => {
        
        this.getAllPatientsWithDate = getAllPatientsWithDate;
        console.log("this.getAllPatientsWithDate")
        this.getAllPatientsWithDate?.forEach((patientt)=>{
          if(patientt.patientId == this.data.patient.id){
            console.log(patientt.patientId)
            console.log(this.data.patient.id)
            this.VisitsForPatient = true
            console.log(this.VisitsForPatient)
          }
        })
      },
      error: (error) => {
       
        console.log('calling get patients with date api failed', error);
      },
    });

    
  }
  close(){
    this.dialog.close();
  }
  
  showError(errorMessage: string) {
    this.toast.error({detail:"ERROR",summary:errorMessage , duration: 9000});
  }

  bookVisit(doctor: GetDoctorByIDDto, patient:GetPatientByPhoneDTO, date : string){
    let day  = date.split('/')[1]
    let month = date.split('/')[0]
    let year = date.split('/')[2]
    let formattedDate  = `${year}-${month}-${day}`

    // console.log(formattedDate)
    // console.log(doctor.id)

    this.PatientService.GetAllPatientWithVisitDate(formattedDate,doctor.id).subscribe({
      next:(getAllPatientsWithDate) => {
        
        this.getAllPatientsWithDate = getAllPatientsWithDate;
        console.log(this.getAllPatientsWithDate)
        this.getAllPatientsWithDate?.forEach((patientt)=>{
          if(patientt.patientId == patient.id){
            console.log(patientt.patientId)
            console.log(patient.id)
           // console.log("mayarrr zah2etttt")
            // //this.showError(`Patient already has an appointment with Dr ${patient?.name} on ${date}`)
            // this.toast.success({ detail: "SUCCESS", summary: 'Receptionist added successfully', duration: 9000 });
            this.VisitsForPatient = true
          }
        })
        if(!this.VisitsForPatient)
        {
         // console.log("haha")
          const addPatientVisit : AddPatientVisitDto={
            doctorId : doctor.id,
            patientId : patient.id,
            dateOfVisit : formattedDate,
          }
          console.log(addPatientVisit.dateOfVisit)
          this.patientService.addPatientVisit(addPatientVisit).subscribe({
            next :  ()=>{
             // console.log("done")
              this.router.navigate(['/appointments'])
              
              this.dialog.close()
            },
            error:(error)=>{
              console.error("calling addVisit api failed",error);
            }  
          });
        }
      },
      error: (error) => {
       
        console.log('calling get patients with date api failed', error);
      },
    });

  
  }
  
  
}

