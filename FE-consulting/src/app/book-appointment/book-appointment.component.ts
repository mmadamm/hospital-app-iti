import { Component, OnInit } from '@angular/core';
import { GetAllDoctorsDto } from '../types/GetAllDoctorsDto';
import { GetDoctorsBySpecializationDto } from '../types/GetDoctorsBySpecializationDto';
import { GetDoctorByIDDto } from '../types/GetDoctorrByIDDto';
import { GetPatientByPhoneDTO } from '../types/GetPatientByPhoneNumberDto';
import { VisitCountDto } from '../types/VisitCountDto';
import { DoctorService } from '../services/doctor.service';
import { DataForBookVisitService } from '../services/data-for-book-visit.service';
import { BookDialog1Component } from '../book-dialog1/book-dialog1.component';
import { BookVisitComponent } from '../book-visit/book-visit.component';
import { DoctorDialogService } from '../services/doctor-dialog.service';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { DoctorsForAllSpecializations } from '../types/DoctorsForAllSpecializations';
import { th } from 'date-fns/locale';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit{
  doctors?: GetAllDoctorsDto[];
  doctorsBySpecialization?: GetDoctorsBySpecializationDto[];
  doctorById? : GetDoctorByIDDto;
  doctorBySpecialization? : GetDoctorByIDDto;
  patient? : GetPatientByPhoneDTO;
  sId : number = 0;
  dId: string = '0';
  sort : string = ' '
  startDate : string = ' '
   bookingDate :  {day : string, dateOfBooking: string}[] = [];
   dates : {date : string}[]=[]
   days : {day : number }[]=[]
   visitCount? : VisitCountDto[];
  bookDoctorVisitCount : boolean = false;
  i : number = 0

  isSearching? : boolean  = false
  specializations?: GetAllSpecializationsDto[];
  Doctors? : DoctorsForAllSpecializations[];
  ActiveDoctors?:DoctorsForAllSpecializations[];
  
    id: any;

    doctorId: string = '0';
    isDoctorSelected : boolean =false;
    isSpecializationSelected: boolean = false;
    constructor(private doctorService : DoctorService,
    private data : DataForBookVisitService,
    private _dialog : DoctorDialogService,
    private router : Router){}
    visitCountsDrById : any
    Visits : {drId? : string , visitrecord?: VisitCountDto[]}[]=[];
  
  
    ngOnInit():void
    { 
      // this.isSearching = false
      this.data.currentId.subscribe(sId => this.sId = sId)
      this.data.currentDoctorId.subscribe(dId => this.dId = dId)

      this.doctorService.GetAllSpecializations().subscribe({
        next:(specializations) => {
          this.specializations = specializations;
        },
        error: (error) => {
          console.log('calling All specializations api failed', error);
        },
      })
      
      this.doctorService.getDoctors().subscribe({
        next:(doctors) => {
          this.doctors = doctors; 
        },
        error: (error) => {
          console.log('calling All doctors api failed', error);
        },
      });
    }

    book(bookDoctor:any, date:string){
      let j =0
      this.Visits.forEach((v)=>
      {
        if(this.Visits[j].drId==bookDoctor.id){
          j++
        }
      })
        var ref = this._dialog.open(bookDoctor,date);
    }

    getDate(doctorById : GetDoctorByIDDto){
      
        this.Visits = []
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
           console.log(this.dId) 
           console.log(this.sId)
           this.Visits.push({drId: doctorById.id,visitrecord:this.visitCount})
           console.log(this.Visits)

          },
          error: (error) => {
            console.log('calling visitCount api failed', error);
          },
          
        });   
    }

    selected(e: Event):void{
      
      this.data.currentId.subscribe(sId => this.sId = sId)
      //this.data.currentDoctorId.subscribe(dId => this.dId = dId)
      this.Doctors = []
      
      //this.dId = '0'
      this.isDoctorSelected = false
      //this.doctorId = '0'
  
      this.id = (e.target as any).value;

      if(this.id == "All"){
        this.isSpecializationSelected = false;
      }else{
        this.isSpecializationSelected = true;
        
      }
      this.Doctors = this.specializations?.find(s => s.id == this.id)?.doctorsForAllSpecializations!
    }

    doctorSelected(event: Event) : void{
      //this.data.currentId.subscribe(sId => this.sId = sId)
      this.data.currentDoctorId.subscribe(dId => this.dId = dId)

      this.doctorId = (event.target as HTMLSelectElement).value;
      console.log(this.doctorId)
      if(this.doctorId == "allDoctors"){
        //this.dId = '0'
        this.isDoctorSelected = false;
      }else{
        this.isDoctorSelected = true;
      }

    }
      onSearch(event : Event): void {
          
          this.isSearching = false
          this.data.currentId.subscribe(sId => this.sId = sId)
          this.data.currentDoctorId.subscribe(dId => this.dId = dId)

          if(this.isSpecializationSelected)
          {
            
            this.data.changeSpecializationId(this.id)
          }

          if(this.isDoctorSelected){
            this.data.changeDoctorId(this.doctorId)
          }
          if(!this.isDoctorSelected){
            this.data.changeDoctorId('0')
          }
          if(!this.isSpecializationSelected){
            this.data.changeSpecializationId(0)
          }
          // this.router.navigate(['//bookAppointment'])
          
          //#region get all doctors
          if(this.dId == '0' && this.sId==0){
            
            this.doctorService.getDoctors().subscribe({
              next:(doctors) => {
                this.doctors = doctors;
                this.isSearching = true
            
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
      
           else if(this.sId !=0 && this.dId=='0'){
            this.doctorService.getDoctorsBySpecialization(this.sId).subscribe({
      
              next:(doctorsBySpecialization) => {
                this.doctorsBySpecialization = doctorsBySpecialization;
                
                this.isSearching = true
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
                      console.log(this.doctorBySpecialization)
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
           else if(this.dId!='0'){
              this.doctorService.getDoctorById(this.dId).subscribe({
              next:(doctorById) => {
                this.isSearching = true
                this.doctorById = doctorById;
                this.getDate(this.doctorById)
              },
              error: (error) => {
                console.log('calling dr by id api failed', error);
              },
            });}
            //#endregion
        }

}
