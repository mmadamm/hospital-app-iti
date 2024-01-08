import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetDoctorsBySpecializationDto } from '../Types/GetDoctorsBySpecializationDto';
import { ChildDoctorOfSpecializationDto } from '../Types/ChildDoctorOfSpecializationDto';
import { Router, RouterModule, Routes } from '@angular/router';
import { DataBetweenDoctorCompHeroCompService } from '../services/data-between-doctor-comp-hero-comp.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';
import { BookDialogueComponent  } from '../book-dialogue/book-dialogue.component';
import { VisitCountDto } from '../Types/VisitCountDto';
import { Token } from '@angular/compiler';
import { PatientService } from '../services/patient.service';
import { GetPatientByPhoneDTO } from '../Types/GetPatientByPhoneDto';
import { ContinueBookingService } from '../services/continue-booking.service';
import { GetAllPatientsWithDateDto } from '../Types/GetAllPatientWithDateDto';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit , AfterViewInit{
 
  doctors?: GetAllDoctorsDto[];
  doctorsBySpecialization?: GetDoctorsBySpecializationDto[];
  doctorById? : GetDoctorByIDDto;
  doctorBySpecialization? : GetDoctorByIDDto;
  patient? : GetPatientByPhoneDTO;
  sId : number =0;
  dId: string = '0';
  sort : string = ' '
  startDate : string = ' '
   bookingDate :  {day : string, dateOfBooking: string}[] = [];
   dates : {date : string}[]=[]
   days : {day : number }[]=[]
   visitCount? : VisitCountDto[];
  bookDoctorVisitCount : boolean = false;
  i : number = 0
  getAllPatientsWithDate?: GetAllPatientsWithDateDto[];
  patientAlreadyBooked: boolean = false;


visitCountsDrById : any

tooken?: string;

Visits : {drId? : string , visitrecord?: VisitCountDto[]}[]=[];
  
 constructor(private doctorService : DoctorService ,
  private data : DataBetweenDoctorCompHeroCompService, 
  private _dialog: DoctorDialogueService,
  private patientService : PatientService,
  private confirmationDialog : ContinueBookingService,
  private toast: NgToastService  ){}
  ngAfterViewInit(): void {
    //#region get patient info if he is logged in
    this.tooken = localStorage.getItem('token')!;
    if(this.tooken){
      var PatientDataString = localStorage.getItem('userData')
      var patientData = JSON.parse(PatientDataString!);
      var patientNumber = patientData.phoneNumber;
      console.log(patientNumber);
      this.patientService.getPatientByPhoneNumber(patientNumber!).subscribe({
        next:(patient) => {
          this.patient = patient 
          console.log(this.patient)
        },
        error: (error) => {
         console.log('calling Patient api failed', error)
         },
      }); 
    }
    //#endregion
  }

    ngOnInit():void
    { 
      
      this.data.currentId.subscribe(sId => this.sId = sId)
      this.data.currentDoctorId.subscribe(dId => this.dId = dId)
      //#region get all doctors
      if(this.dId == '0' && this.sId==0){
      this.doctorService.getDoctors().subscribe({
        next:(doctors) => {
          this.doctors = doctors;
          this.doctors.forEach((doctor)=>{
            this.getDate(doctor)
          })
        },
        error: (error) => {
          console.log('calling  all doctors api failed', error);
        },
      });
      }
      //#endregion
      //#region doctors by specialization

      if(this.sId !=0 && this.dId=='0'){
      this.doctorService.getDoctorsBySpecialization(this.sId).subscribe({

        next:(doctorsBySpecialization) => {
          this.doctorsBySpecialization = doctorsBySpecialization;
          this.doctorsBySpecialization.forEach((doctor)=>{
            doctor.childDoctorOfSpecializations?.forEach((item)=>{
              this.doctorBySpecialization= {
                id :item.id,
                name:item.name,
                specializationName : doctor.name,
                description:item.description,
                title:item.title,
                status : item.status,
                weekSchadual:item.weekSchadual}
                this.getDate(this.doctorBySpecialization)

            })
           
          })
        },
        error: (error) => {
          console.log('calling get drs by specialization api failed', error);
        },
      });
      }
      //#endregion
      //#region doctor by id
      if(this.dId!='0'){
        this.doctorService.getDoctorById(this.dId).subscribe({
        next:(doctorById) => {
          this.doctorById = doctorById;
         
          this.getDate(this.doctorById)
         },
        error: (error) => {
          console.log('calling dr by id api failed', error);
        },
      });}
      //#endregion

    }
    
    
    book(bookDoctor:any, date:string){
      let j =0
      this.Visits.forEach((v)=>
      {
        if(this.Visits[j].drId==bookDoctor.id){
        //  console.log(this.Visits[i])
          j++
        }
      })
      if(this.tooken){
        let day = date.split('/')[1]
        let month = date.split('/')[0]
        let year = date.split('/')[2]
        var patientId = this.patient?.id;
        let formattedDate  = `${year}-${month}-${day}`
        var refr = this.confirmationDialog.open(bookDoctor , date ,this.patient );
      }else{
        var ref = this._dialog.open(bookDoctor,date);
      }
    }
    showError(errorMessage: string) {
      this.toast.error({detail:"ERROR",summary:errorMessage,sticky:true});
    }

    getDate(doctorById : GetDoctorByIDDto){
     
        let currentDate = new Date();
        
        const year : number = currentDate.getFullYear()
        const month : number = currentDate.getMonth()+1
        const day : number = currentDate.getDate()+0
        let startDate  = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`
       
        let endDate =new Date (currentDate.setDate(currentDate.getDate() + 7));

        const endyear : number = endDate.getFullYear()
        const endmonth : number = endDate.getMonth()+1
        const endDay : number = endDate.getDate()+0
      
       let endDate1 = `${endyear}-${endmonth.toString().padStart(2,'0')}-${endDay.toString().padStart(2,'0')}`
       
       this.doctorService.GetVisitCountForWeek(startDate,endDate1,doctorById?.id).subscribe({
          next:(visitCount) => {
            this.visitCount = visitCount;
            this.Visits.push({drId: doctorById.id,visitrecord:this.visitCount})
            
          },
          error: (error) => {
            console.log('calling visitCount api failed', error);
          },
          
        });   
    }

  
}


