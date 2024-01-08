import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appiontment.service';
import GetPatientVisitDto from '../Types/GetPatientVisitDto';
import { Observable } from 'rxjs';
import  {GetPatientVisitsChildDto}  from '../Types/GetPatientVisitsChildDto';
import { DoctorService } from '../services/doctor.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import VisitReviewAndRateDto from '../Types/VisitReviewAndRateDto';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { PatientDataService } from '../services/PatientDataService';
import { PatientService } from '../services/patient.service';
import { VisitCountDto } from '../Types/VisitCountDto';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('ratingForm') ratingForm: ElementRef | undefined;
  appointments: any = [];
  phoneNumber: string = '';
  doctorID : string = '';
  doctor? : GetDoctorByIDDto;
  patientVisits: GetPatientVisitsChildDto[] = [];
  currentDate: Date = new Date();
  rate: number = 0 ;
  review: string = '';
  formSubmitted: boolean = false;
  ratingSet: boolean = false;
  dateOfVisit: any;
  visits : { doctor : GetDoctorByIDDto , visit : any}[]=[]
  formattedDate: string = '';
  constructor(private appointmentService: AppointmentService ,
     private doctorService : DoctorService ,
      private reviewService: ReviewService ,
      private patientService : PatientService) {}


  ngOnInit(): void {
    // Fetch phone number from local storage
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.phoneNumber = userData.phoneNumber;

      if (this.phoneNumber) {
        this.loadAppointments(this.phoneNumber).subscribe((data) => {
          this.appointments = data;
       //   console.log(data)
          const dataArray = Object.values(data);
      //    console.log(dataArray);
          this.appointments =dataArray;
     //     console.log('Appointments loaded:', this.appointments[1].length);
          this.appointments[2].forEach((e:any)=>{
          this.rate = e.rate;
          this.review = e.review;

          this.doctorID = e.doctorId;
        //    console.log(this.doctor?.name)
            // this.dateOfVisit = e.dateOfVisit;
            // console.log(this.dateOfVisit);
            // console.log(typeof(this.dateOfVisit));
            // console.log(typeof(e.dateOfVisit));
            // console.log(this.isPastVisit(this.dateOfVisit));
            // console.log(this.isFutureVisit(this.dateOfVisit));
            // console.log(this.isTodayVisit(this.dateOfVisit));

            this.doctorService.getDoctorById(this.doctorID).subscribe((d)=>{
              this.doctor = d;
          //    console.log(this.doctor.name)
              this.visits.push({doctor:d,visit:e})
             // console.log(this.visits)
            })

          });
          if (this.appointments[1].length > 0) {
           // console.log('First appointment name:', this.appointments[1]);
           // console.log('First appointment length:', this.appointments[1].length);

            // Accessing patient visits of the first appointment
            const patientVisits = this.appointments[1];
            if (patientVisits.length > 0) {
          //    console.log('First patient visit date:', patientVisits[0].dateOfVisit);
           //   console.log('First patient visit comments:', patientVisits[0].comments);
            }
          }
        });
      } else {
        console.error('Phone number not found in local storage.');
      }
    } else {
      console.error('User data not found in local storage.');
    }
  }


  onDelete(e:Event, id : number,status : string){
    this.showConfirmation(e , id , status)
   
  }
  showConfirmation(e:Event, id : number , status : string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        const event = (e.target as any).value
    //console.log(id)
    if(status != 'done'){
      
    this.patientService.deleteAppointment(id).subscribe({
      next:()=>{
        this.visits = []
        this.loadAppointments(this.phoneNumber).subscribe((data) => {
          this.appointments = data;
       //   console.log(data)
          const dataArray = Object.values(data);
        //  console.log(dataArray);
          this.appointments =dataArray;
        //  console.log('Appointments loaded:', this.appointments[1].length);
          this.appointments[2].forEach((e:any)=>{
            this.rate = e.rate;
            this.review = e.review;

            this.doctorID = e.doctorId;

            this.doctorService.getDoctorById(this.doctorID).subscribe((d)=>{
              this.doctor = d;
              this.visits.push({doctor:d,visit:e})

              console.log(this.doctor.name)
            })

          });
          // if (this.appointments[1].length > 0) {
          //   console.log('First appointment name:', this.appointments[1]);
          //   console.log('First appointment length:', this.appointments[1].length);

            // Accessing patient visits of the first appointment
            const patientVisits = this.appointments[2];
          //   if (patientVisits.length > 0) {
          //     console.log('First patient visit date:', patientVisits[0].dateOfVisit);
          //     console.log('First patient visit comments:', patientVisits[0].comments);
          //   }
          // }
        });
      },
      error:(error)=>{
        console.log("delete patient visit api failed",error)
      }
    })}
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your file is safe :)', 'info');
      }
    });
  }
  

  // Function to load appointments from the API
  loadAppointments(phoneNumber: string): Observable<GetPatientVisitDto[]> {
    return this.appointmentService.getAppointmentsByPhoneNumber(phoneNumber);
  }
  isFutureVisit(dateOfVisit: string): boolean {
    const visitDate = new Date(dateOfVisit);
    const currentDate = new Date();
    return visitDate > currentDate;

  }


  isTodayVisit(dateOfVisit: string): boolean {
    const visitDate = new Date(dateOfVisit);
    const currentDate = new Date();
    if (visitDate.toDateString() == currentDate.toDateString()){
  console.log("today:" + visitDate.toDateString())
    console.log("today:" + currentDate.toDateString())
    console.log("today:" + visitDate)
    console.log("today:" + currentDate)
    return true
    };
    return false;
  }

  isPastVisit(dateOfVisit: string): boolean {
    const visitDate = new Date(dateOfVisit);
    const currentDate = new Date();
    return visitDate < currentDate;
  }
  get sortedAppointments(): any[] {
    // Assuming appointments[1] is an array of appointments
    return this.visits.sort((a: any, b: any) => {
      const dateA = new Date(a.visit.dateOfVisit);
      const dateB = new Date(b.visit.dateOfVisit);
      return dateB.getTime() - dateA.getTime();
    });
  }

  form = new FormGroup({
    rate: new FormControl<number>(0 , []),
    review: new FormControl<string>('',[])
  })

  getf(){
    console.log(this.form.controls)
  }

  clickHandle(e: Event , id:string , i:number) {
    const rate: number | null = this.form.controls.rate.value;
    const review: string | null = this.form.controls.review.value;
    const appointmentIndex = this.appointments[2].findIndex((appointment: any) => appointment.id === id);
      this.appointments[2][appointmentIndex].review = review;
    // const visitId : int | null = e.Id;
    console.log(this.appointments[2].Id);
    if ((rate !== null && this.form.controls.rate.valid)&& (review !== null && this.form.controls.review.valid)) {
      console.log(rate);
      console.log(review);
      console.log(id);
      const appointmentIndex = this.appointments[2].findIndex((appointment: any) => appointment.id === id);
      this.appointments[2][appointmentIndex].review = review;

      const reviewDto: VisitReviewAndRateDto = {
        id: +id,  // Assuming id is the property in VisitReviewAndRateDto
        rate: rate,
        review: review,
      };
      this.reviewService.postRateAndReview(reviewDto).subscribe(()=>
      {
        console.log(reviewDto);
      });

    } else {
      console.error('Rate is either null or not valid');
    }

    this.formSubmitted = true;
    let btn = e.target as HTMLFormElement
    let reviewDiv = document.getElementById('i_'+i)
    let reviewData = document.getElementsByClassName("reviewData");
    console.log("review div: " + reviewDiv)
    console.log("review data: " + reviewData)
    if(this.formSubmitted){
      console.log("submitted successfully")
      btn.style.display = "none";
      if(reviewDiv != null){
        reviewDiv.style.display = "none"
      }
      for (let i = 0; i < reviewData.length; i++) {
        let element = reviewData[i] as HTMLElement;
        element.style.display = "block";
      }
    }
    this.ratingSet = false;
  }
  getStarsArray(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
  }
  getRemainingStarsArray(rate: number): number[] {
    const remainingStarsCount = 5 - rate;
    return Array.from({ length: remainingStarsCount }, (_, index) => rate + index + 1);
  }

setRating(star: number, appointmentIndex: number) {
  this.form.controls.rate.setValue(star);
  console.log("app index= " + appointmentIndex)

  if (this.ratingForm) {
    let card = document.getElementById(`${appointmentIndex}`)!;
    let stars = card?.getElementsByClassName("fa-star");
    console.log("card" + card)
    console.log("stars: " + stars)

    console.log('stars in fn:', stars);

    for (let i = 0; i < stars.length; i++) {
      const starElement = stars[i] as HTMLElement;

      // Add 'filled-star' class only up to the selected star
      if (i < star) {
        starElement.classList.add('filled-star');
      } else {
        // Remove 'filled-star' class for stars beyond the selected star
        starElement.classList.remove('filled-star');
      }
    }
    this.ratingSet = true;
    if (stars && this.ratingSet) {
      let buttons = card.getElementsByClassName("ButtonItem");
      for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i] as HTMLElement;
        button.style.opacity = '1';
      }
    }

  }

  // You can access the appointment ID here
  const appointmentId = this.appointments[1][appointmentIndex].id;
  console.log('Appointment ID:', appointmentId);
}

}
