import { Component, OnInit , Input } from '@angular/core';
import { GetAllDoctorsDto } from '../types/GetAllDoctorsDto';
import { DoctorService } from '../services/doctor.service';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { SpecializationService } from '../services/specialization.service';
import { DoctorsForAllSpecializations } from '../types/DoctorsForAllSpecializations';
import { Router, RouterModule, Routes } from '@angular/router';
import { GetDoctorByIDDto } from '../types/GetDoctorrByIDDto';
import { DataForBookVisitService } from '../services/data-for-book-visit.service';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';

@Component({
  selector: 'app-book-visit',
  templateUrl: './book-visit.component.html',
  styleUrls: ['./book-visit.component.css']
})
export class BookVisitComponent implements OnInit {

  doctors?: GetAllDoctorsDto[];
  specializations?: GetAllSpecializationsDto[];
  Doctors? : DoctorsForAllSpecializations[];
  ActiveDoctors?:DoctorsForAllSpecializations[];
  doctorById?: GetDoctorByIDDto;

  sId : number =0;
  id: any;
  dId! : string;
  doctorId: string = '0';

  isDoctorSelected : boolean =false;
  isSpecializationSelected: boolean = false;

constructor(private doctorService : DoctorService , 
  private specializationService: SpecializationService,
   private router:Router,
    private data : DataForBookVisitService,
    private app : BookAppointmentComponent
   ){}
  ngOnInit():void{
    this.data.currentId.subscribe(sId => this.sId = sId)
    this.data.currentDoctorId.subscribe(dId => this.dId = dId)
    this.doctorService.getDoctors().subscribe({
      next:(doctors) => {
        this.doctors = doctors;
        
      },
      error: (error) => {
        console.log('calling All doctors api failed', error);
      },
    });
    this.doctorService.GetAllSpecializations().subscribe({
      next:(specializations) => {
        this.specializations = specializations;
      },
      error: (error) => {
        console.log('calling All specializations api failed', error);
      },
    })
  }

      selected(e: Event):void{

          this.isSpecializationSelected = true;
          this.id = (e.target as any).value;

          if(this.id === "All"){
            this.isSpecializationSelected = false;
          }
          this.Doctors = this.specializations?.find(s => s.id == this.id)?.doctorsForAllSpecializations!
          console.log(this.Doctors)
        }

      doctorSelected(event: Event):void{

        this.doctorId = (event.target as HTMLSelectElement).value;
        this.isDoctorSelected = true;
        if(this.doctorId == "allDoctors"){
          this.isDoctorSelected = false;
        }

      }
      onSearch(event : Event): void {

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
           this.app.ngOnInit()
        }

    
    }
