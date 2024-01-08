import { Component, OnInit , Input } from '@angular/core';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { DoctorService } from '../services/doctor.service';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { SpecializationService } from '../services/specialization.service';
import { DoctorsForAllSpecializations } from '../Types/DoctorsForAllSpecializations';
import { Router, RouterModule, Routes } from '@angular/router';
import { DataBetweenDoctorCompHeroCompService } from '../services/data-between-doctor-comp-hero-comp.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { LoadingService } from '../services/loading.service';
import { VisitCountDto } from '../Types/VisitCountDto';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  doctors?: GetAllDoctorsDto[];
  specializations?: GetAllSpecializationsDto[];
  Doctors? : DoctorsForAllSpecializations[];
  ActiveDoctors?:DoctorsForAllSpecializations[];
  doctorById?: GetDoctorByIDDto;
  visitCount? : VisitCountDto
  sId : number =0;
  id: any;
  dId! : string;
  doctorId: string = '0';

  isDoctorSelected : boolean =false;
  isSpecializationSelected: boolean = false;

constructor(private doctorService : DoctorService , 
  private specializationService: SpecializationService,
   private router:Router,
    private data : DataBetweenDoctorCompHeroCompService,
    private loadingService: LoadingService){}
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
      
    }

  doctorSelected(event: Event):void{

    this.doctorId = (event.target as HTMLSelectElement).value;
    this.isDoctorSelected = true;
    if(this.doctorId == "allDoctors"){
      this.isDoctorSelected = false;
    }

  }
  onSearch(event : Event): void {
    this.loadingService.setLoading(true);

    setTimeout(() => {
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
        this.loadingService.setLoading(false);
        this.router.navigate(['/doctor'])
        // this.loadingService.setLoading(false);
    });

    }
}
