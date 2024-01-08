import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { GetDoctorByIDForAdminDto } from '../types/GetDoctorByIDForAdminDto';
import { AuthenticationService } from '../services/authentication.service';
import { GetAllPatientsWithDateDto } from '../types/GetAllPatientsWithDateDto';
// import { DatePipe } from '@angular/common';
import { format } from 'date-fns';
import { GetAllDoctorsDto } from '../types/GetAllDoctorsDto';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { DoctorsForAllSpecializations } from '../types/DoctorsForAllSpecializations';
import { UpdateArrivalPatientStatusDto } from '../types/UpdateArrivalPatientStatusDto';
import { ReceptionService } from '../services/reception.service';
import { BehaviorSubject } from 'rxjs';
import { PhoneNumberBetweenDashboardAndPatientProfileService } from '../services/phone-number-between-dashboard-and-patient-profile.service';
import { GetAllPatientForADayService } from '../services/GetNumberOfPatientForADay.service';
import { GetDoctorForADayService } from '../services/GetDoctorsForADay.service';
import { ChildActivationStart } from '@angular/router';
import { GetTopRatedDoctorsService } from '../services/TopRatedDoctors.service';
import { GetHighDemandSpecializationService } from '../services/getHighDemandSpecialization.service';
import { GetAllSpecializationsService } from '../services/getAllSpecializations.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
DoctorId? : string;
visits?: GetAllPatientsWithDateDto[];
formattedDate?: string;
isDoctorLoggedIn?: boolean;
isReceptionLoggedIn?: boolean;
isLoggedIn? : boolean;
doctorId: string = '0';
done: boolean = false;


constructor(private doctorService: DoctorService,
  private authenticationService : AuthenticationService,
  private receptionService: ReceptionService,
  private patientPhoneNumberService : PhoneNumberBetweenDashboardAndPatientProfileService ,
  private getNumberOfPatientForADay: GetAllPatientForADayService,
  private getDoctorsforADay:GetDoctorForADayService,
  private getTopRatedDoctorsService: GetTopRatedDoctorsService,
  private getHighDemandSpecialization : GetHighDemandSpecializationService,
  private getAllSpecialization : GetAllSpecializationsService){}


  currentDate? = new Date();
  doctors?: GetAllDoctorsDto[];
  specializations?: GetAllSpecializationsDto[];
  isSpecializationSelected: boolean = false;
  id ? :number ;
  Doctors? : DoctorsForAllSpecializations[];
  isDoctorSelected : boolean =false;
  doctor? : GetDoctorByIDForAdminDto;
  patientVisit?: UpdateArrivalPatientStatusDto;
  today : any;
  yesterday: any;
  todayPatients: number = 0;
  yesterdayPatients:number = 0;
  todayDoctors : number = 0;
  yesterdayDoctors : number = 0;
  numberOfAllDoctors : number = 0;
  datePicker: string = '';
  numberOfPatients: number = 0;
  numberOfDoctors: number = 0;
  topRatedArray: any;
  lowestRatedArray: any;
  ratedArray: any;
  HighDemandArray: { specializationId: any, specializationName:String , length: number }[] = [];
  maxLength:number =0;
  ngOnInit(): void {
    const date = new Date()

    this.today = new Date();
    const todayFormatted = this.formatDate(this.today);

    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    const yesterdayFormatted = this.formatDate(this.yesterday);

    const year : number = date.getFullYear()
    const month : number = date.getMonth()+1
    const day : number = date.getDate()+0
    let startDate  = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`


    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const lastDayOfMonth = new Date(nextMonth.getTime() - 1);

    const formattedStartOfMonth = this.formatDate(startOfMonth);
    const formattedLastDayOfMonth = this.formatDate(lastDayOfMonth);

   
    let endDate =new Date (date.setDate(date.getDate() + 32));

    const endyear : number = endDate.getFullYear()
    const endmonth : number = endDate.getMonth()+1
    const endDay : number = endDate.getDate()+0

    let startDateVC  = `${endyear}-${endmonth.toString().padStart(2,'0')}-${'1'.toString().padStart(2,'0')}`


   let endDate1 = `${endyear}-${endmonth.toString().padStart(2,'0')}-${endDay.toString().padStart(2,'0')}`
   
        if(day==25){
        this.doctorService.addVisitCount(startDateVC,endDate1).subscribe({
          next:()=>{

          },
          error:(error)=>{
            console.log("add visit count api failed",error)
          }
        })
      }

    this.authenticationService.isDoctorLoggedIn$.subscribe((isDoctorLoggedIn) => {
      this.isDoctorLoggedIn = isDoctorLoggedIn;
    });
    this.authenticationService.isReceptionLoggedIn$.subscribe((isReceptionLoggedIn) => {
      this.isReceptionLoggedIn = isReceptionLoggedIn;
    })

    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) =>{
      this.isLoggedIn = isLoggedIn;
    })

      this.formattedDate = format(this.currentDate!, 'yyyy-MM-dd');
      //this.formattedDate = this.currentDate?.toISOString();
      // console.log(this.formattedDate)
      if(this.isDoctorLoggedIn){
        this.DoctorId = localStorage.getItem('DoctorId')!

        //console.log(this.DoctorId)
        this.doctorService.getAllPatientsWithDates(this.formattedDate! , this.DoctorId).subscribe({
          next:(visit) => {
            this.visits = visit
            // console.log(this.visits)
          },
          error:(error) => {
            console.log('calling get patient visit api faild', error);
          }
        })
      }else if(this.isReceptionLoggedIn){
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
      }else if(this.isLoggedIn){
        // Number of Patients Today
        this.getNumberOfPatientForADay.getAllPatientsForADay(todayFormatted).subscribe({
          next:(counter) => {
            this.todayPatients = counter;
          },
          error: (error) =>{
            console.log('calling All specializations api failed', error);
          }
        })
        this.getNumberOfPatientForADay.getAllPatientsForADay(yesterdayFormatted).subscribe({
          next:(yesterdayCounter) => {
            this.yesterdayPatients = yesterdayCounter;
          },
          error: (error) =>{
            console.log('calling All specializations api failed', error);
          }
        })

        // Number of Doctors Today
        this.getDoctorsforADay.getDoctorForADay(todayFormatted).subscribe({
          next:(DoctorTodayCounter) => {
            this.todayDoctors = DoctorTodayCounter;
          },
          error: (error) =>{
            console.log('calling All specializations api failed', error);
          }
        })
        this.getDoctorsforADay.getDoctorForADay(yesterdayFormatted).subscribe({
          next:(DoctorYesterdayCounter) => {
            this.yesterdayDoctors = DoctorYesterdayCounter;
          },
          error: (error) =>{
            console.log('calling All specializations api failed', error);
          }
        })

         // Capacity of Doctorss Today
        this.doctorService.getDoctors().subscribe({
          next : (drs) =>{
            this.numberOfAllDoctors = drs.length;
          }
        })

        // Get top Rated Doctors
        this.getTopRatedDoctorsService.getTopRatedDoctors().subscribe({
          next: (topRated) => {
            this.topRatedArray = Object.values(topRated);
            this.topRatedArray.sort((a:any, b:any) => b.averageRate - a.averageRate);
            this.topRatedArray = this.topRatedArray.slice(0, 3);
            this.lowestRatedArray = Object.values(topRated);
            this.lowestRatedArray.sort((a:any, b:any) => b.averageRate - a.averageRate);
            this.lowestRatedArray = this.lowestRatedArray.slice(-3);
            this.ratedArray = Object.values(topRated);
            this.ratedArray.sort((a:any, b:any) => b.averageRate - a.averageRate);
          }
        })

      //Get High Demand Specialization
      this.getAllSpecialization.getAllSpecializations().subscribe({
        next: (Allspecializations:any) => {
          Allspecializations.forEach((e :any)  => {
            console.log(e.id);
            console.log(e.name);
            this.getHighDemandSpecialization.getHighDemandSpecialization(formattedStartOfMonth,formattedLastDayOfMonth,e.id).subscribe({
              next:(spec) => {
                const arrayOfValues = Object.values(spec);
                const specializationId = e.id;
                const SpecializationName = e.name;
                this.HighDemandArray.push({ specializationId, specializationName:SpecializationName, length: arrayOfValues.length });
                console.log(this.HighDemandArray);
                this.maxLength = this.calculateMaxLength();
                console.log("Max Length:", this.maxLength);
              },
              error: (error) => {
                console.error(error);
              }

            })
          });
        },
        error: (error) => {
          console.error(error);
        }
      })

      }


  }

  selected(e: Event):void{

    this.isSpecializationSelected = true;
    this.id = (e.target as any).value;


    if(this.id == 0){
      this.isSpecializationSelected = false;
    }
    this.Doctors = this.specializations?.find(s => s.id == this.id)?.doctorsForAllSpecializations!
    // console.log(this.Doctors)
  }

  goToProfile(PhoneNumber: string){
    this.patientPhoneNumberService.ChangePatientPhoneNumber(PhoneNumber);
  }

  doctorSelected(event: Event):void{

    this.doctorId = (event.target as HTMLSelectElement).value;

    this.isDoctorSelected = true;
    if(this.doctorId == "allDoctors"){
      this.isDoctorSelected = false;
    }

  }
  onSearch(e: Event){
    this.doctorService.getDoctorByIdForAdmin(this.doctorId).subscribe({
      next:(doctorByPhone) => {
        this.doctor = doctorByPhone;
        this.doctorService.getAllPatientsWithDates(this.formattedDate! , this.doctor.id!).subscribe({
          next:(visit) => {
            this.visits = visit
            // console.log(this.visits)
          },
          error:(error) => {
            console.log('calling get patient visit api faild', error);
          }
        })
      },
      error: (error) => {
        console.log('calling dr by id api failed', error);
      },
    })

  }
  onArrive( status : string, id: number){
    // console.log(id)
    this.patientVisit = ({
      id : id,
      visitStatus : status,
    });
    // console.log(this.patientVisit!.id)
    this.receptionService.UpdatePatientVisitStatus(this.patientVisit!).subscribe({
      next:(patientVisit) => {
        // console.log(patientVisit as GetAllPatientsWithDateDto)
        const index = this.visits?.findIndex(v => v.id === (patientVisit as GetAllPatientsWithDateDto).id)
        this.visits![index!] = patientVisit as GetAllPatientsWithDateDto;
        console.log(patientVisit as GetAllPatientsWithDateDto)
      },
      error:(error) => {
        console.log('calling update patient visit status failed', error)
      }
    })
    if(status = 'done'){
      this.done = true;
    }
  }

  formatDate(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateDatePicker(event: any) {
    this.datePicker = event.target.value;
    this.getNumberOfPatientForADay.getAllPatientsForADay(this.datePicker).subscribe({
      next : (patientsNumber) => {
        this.numberOfPatients = patientsNumber;
      },
      error : (error) => {
        console.error(error);
      },
    });
    this.getDoctorsforADay.getDoctorForADay(this.datePicker).subscribe({
      next : (DoctorNumber) => {
        this.numberOfDoctors = DoctorNumber;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  calculateProgressBarWidth(length: number): any {
    const percentage = (length / this.maxLength) * 100;
    return percentage;
  }

  calculateMaxLength(): number {
    let maxLength = 0;
    for (const item of this.HighDemandArray) {
      if (item.length > maxLength) {
        maxLength = item.length;
      }
    }
    return maxLength;
  }

  getProgressBarColor(): string {
    const randomColor = () => Math.floor(Math.random() * 256);
    const rgbColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    return rgbColor;
  }


}
