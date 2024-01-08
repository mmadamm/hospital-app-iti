// patient-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patientByPhoneNumber.service';
import { GetPatientByPhoneDTO } from '../types/GetPatientByPhoneNumberDto';
import { MedicalHistoryDto } from '../types/MedicalHistoryDto';
import {AddMedicalHistoryDto} from '../types/AddMedicalHistoryDto';
import { MedicalHistoryService } from '../services/MedicalHistroy.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { MutualVisitsService } from '../services/getMutualVisits.service';
import { GetPatientVisitsChildDTO } from '../types/GetPatientVisitChildDto';
import { UpdatePatientVisitService } from '../services/updatePatientVisit.service';
import { UpdatePatientVisitDto } from '../types/UpdatePatientVisitDto';
import { PhoneNumberBetweenDashboardAndPatientProfileService } from '../services/phone-number-between-dashboard-and-patient-profile.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  patientDto?: GetPatientByPhoneDTO;
  name: string = '';
  phoneNumber: string = '';
  gender: string = '';
  dateOfBirth: any;
  visits?: GetPatientVisitsChildDTO[] = [];
  id: number = 0
  dateOfVisit: any;
  comments: string = '';
  symptoms: string = '';
  prescription: string = '';
  udpateDto: any;
  buttonEnabled = false;
  formSubmitted: boolean[] = [];
  cardButtonEnabled: boolean[] = [];
  patientId: string | null = null;
  patientPhoneNumber!: string;
  doctorPhoneNumber!: string;
  hasMedicalHistory: boolean = false;
  showMedicalHistoryForm: boolean = false; 
  medicalHistoryData!: MedicalHistoryDto;


  constructor(private patientService: PatientService,
    private mutualVisits: MutualVisitsService,
    private updateParientVisitService: UpdatePatientVisitService,
    private medicalHistoryService: MedicalHistoryService, 
    private toast: NgToastService ,
    private phoneNumberService: PhoneNumberBetweenDashboardAndPatientProfileService,
    private authenticationService: AuthenticationService) { }



  form = new FormGroup({
    previousSurgeries: new FormControl<string>(''),
    other: new FormControl<string>(''),
    hepatitis: new FormControl<string>(''),
    medication: new FormControl<string>(''),
    bloodGroup: new FormControl<string>(''),
    martialStatus: new FormControl<boolean>(false),
    pregnancy: new FormControl<boolean>(false),
    heartDisease: new FormControl<boolean>(false),
    anxityOrPanicDisorder: new FormControl<boolean>(false),
    depression: new FormControl<boolean>(false),
    allergies: new FormControl<boolean>(false),
    smoker: new FormControl<boolean>(false),
    diabetes: new FormControl<boolean>(false),
    highBloodPressure: new FormControl<boolean>(false),
    lowBloodPressure: new FormControl<boolean>(false),
    asthma: new FormControl<boolean>(false),
    symptoms: new FormControl<string>(''),
    comments: new FormControl<string>(''),
    prescription: new FormControl<string>('')
  });


  ngOnInit(): void {

   this.phoneNumberService.currentPhoneNumber.subscribe(
    phoneNumber => {
      this.patientPhoneNumber = phoneNumber;
      console.log(this.patientPhoneNumber)
    }
   )
    this.patientService.getPatientByPhoneNumber(this.patientPhoneNumber).subscribe({
      next: (patient: GetPatientByPhoneDTO) => {
        this.patientDto = patient;
        this.name = patient.name!;
        this.phoneNumber = patient.phoneNumber!;
        this.gender = patient.gender!;
        this.dateOfBirth = patient.dateOfBirth;
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      },
    });

    this.getMedicalHistory();
   
   this.doctorPhoneNumber = localStorage.getItem("phoneNumber")!;

    this.mutualVisits.getMutualVisits(this.patientPhoneNumber, this.doctorPhoneNumber).subscribe({
      next: (mutualVisit: GetPatientVisitsChildDTO) => {
      //  console.log(typeof (mutualVisit))
   
        this.visits = Object.values(mutualVisit);
        this.id = mutualVisit.id;
        this.dateOfVisit = mutualVisit.dateOfVisit;
        if (mutualVisit.prescription != null) {
          this.prescription = mutualVisit.prescription;
        }
        if (mutualVisit.symptoms != null) {
          this.symptoms = mutualVisit.symptoms!;
        }
        if (mutualVisit.comments != null) {
          this.comments = mutualVisit.comments!;
        }

        console.log("visits:" + this.visits);
        this.visits = this.visits.sort((a, b) => new Date(b.dateOfVisit).getTime() - new Date(a.dateOfVisit).getTime());

      },
      error: (error) => {
        console.error('Error fetching visits:', error);
      },
    });
    this.cardButtonEnabled = new Array(this.visits?.length).fill(true);
  }

 private getMedicalHistory(){
  
  this.medicalHistoryService.getMedicalHistory(this.patientPhoneNumber).subscribe({
    next: (medicalHistoryData: MedicalHistoryDto) => {
        this.id = medicalHistoryData.id;
        this.patientId = medicalHistoryData.patientId;
        this.updateMedicalHistoryForm(medicalHistoryData);
        this.hasMedicalHistory=true;
        this.medicalHistoryData = medicalHistoryData
    },
    error: (error) => {
      console.error('Error fetching medical history data:', error);
      this.hasMedicalHistory = false;
    },
  });
 }
  private updateMedicalHistoryForm(data: MedicalHistoryDto | null): void {
    if (data) {
      this.form.patchValue({
        martialStatus: data.martialStatus,
        pregnancy: data.pregnancy,
        bloodGroup: data.bloodGroup,
        previousSurgeries: data.previousSurgeries,
        medication: data.medication,
        smoker: data.smoker,
        diabetes: data.diabetes,
        highBloodPressure: data.highBloodPressure,
        lowBloodPressure: data.lowBloodPressure,
        asthma: data.asthma,
        hepatitis: data.hepatitis,
        heartDisease: data.heartDisease,
        anxityOrPanicDisorder: data.anxityOrPanicDisorder,
        depression: data.depression,
        allergies: data.allergies,
        other: data.other,
      });
    }
  }


public addMedicalHistory() {
  this.showMedicalHistoryForm = true;
}

public addRecord(e:Event){
 e.preventDefault();
  console.log('ADD')
  const formData: AddMedicalHistoryDto = {
    patientId: this.patientDto?.id!,
    martialStatus: this.form.controls['martialStatus'].value ?? false,
    pregnancy: this.form.controls['pregnancy'].value ?? false,
    bloodGroup: this.form.controls['bloodGroup'].value,
    previousSurgeries: this.form.controls['previousSurgeries'].value,
    medication: this.form.controls['medication'].value,
    smoker: this.form.controls['smoker'].value ?? false,
    diabetes: this.form.controls['diabetes'].value ?? false,
    highBloodPressure: this.form.controls['highBloodPressure'].value ?? false,
    lowBloodPressure: this.form.controls['lowBloodPressure'].value ?? false,
    asthma: this.form.controls['asthma'].value ?? false,
    hepatitis: this.form.controls['hepatitis'].value,
    heartDisease: this.form.controls['heartDisease'].value ?? false,
    anxityOrPanicDisorder: this.form.controls['anxityOrPanicDisorder'].value ?? false,
    depression: this.form.controls['depression'].value ?? false,
    allergies: this.form.controls['allergies'].value ?? false,
    other: this.form.controls['other'].value,
  };

  this.medicalHistoryService.addMedicalHistory(formData).subscribe({
    next: (response) => {
      console.log('Medical history added successfully:', response);
      this.addSuccess(); 
      this.showMedicalHistoryForm=false;
      this.hasMedicalHistory=true;
      this.getMedicalHistory();
    },
    error: (error) => {
      console.error('Error adding medical history:', error);
    },
  });
}


  onSubmitt(e:Event) {
    e.preventDefault();
    
    if (this.form.valid) {
      const formData: MedicalHistoryDto = {
        id: this.medicalHistoryData.id,
        patientId: this.patientId!,
        martialStatus: this.form.controls['martialStatus'].value ?? false,
        pregnancy: this.form.controls['pregnancy'].value ?? false,
        bloodGroup: this.form.controls['bloodGroup'].value,
        previousSurgeries: this.form.controls['previousSurgeries'].value,
        medication: this.form.controls['medication'].value,
        smoker: this.form.controls['smoker'].value ?? false,
        diabetes: this.form.controls['diabetes'].value ?? false,
        highBloodPressure: this.form.controls['highBloodPressure'].value ?? false,
        lowBloodPressure: this.form.controls['lowBloodPressure'].value ?? false,
        asthma: this.form.controls['asthma'].value ?? false,
        hepatitis: this.form.controls['hepatitis'].value,
        heartDisease: this.form.controls['heartDisease'].value ?? false,
        anxityOrPanicDisorder: this.form.controls['anxityOrPanicDisorder'].value ?? false,
        depression: this.form.controls['depression'].value ?? false,
        allergies: this.form.controls['allergies'].value ?? false,
        other: this.form.controls['other'].value,
      };

      console.log(this.form.controls.other);
      console.log(this.id);


      this.medicalHistoryService.updateMedicalHistory(formData).subscribe({
        next: (response) => {
          console.log('Medical history updated successfully:', response);
          this.updateSuccess();
          console.log(this.id)

        },
        error: (error) => {
          console.error('Error updating medical history:', error);
          console.log(this.id)
        },
      });
    } else {
      console.error('Form is not valid. Please check your inputs.');
    }

  }
  private updateSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Patient medical history updated', duration: 9000 });
  }
    private addSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Patient medical history added', duration: 9000 });
  }

  onSubmit(e: Event, Id: number, i: number) {
    this.udpateDto = {
      id: Id,
      symptoms: this.form.controls['symptoms'].value,
      comments: this.form.controls['comments'].value,
      prescription: this.form.controls['prescription'].value,
    }

    this.updateParientVisitService.updatePatientVisit(this.udpateDto).subscribe(
      (response) => {
        console.log("updated");
        console.log(this.udpateDto)
        console.log(this.udpateDto.id)
        console.log(this.udpateDto.symptoms)
        console.log(this.udpateDto.comments)
        console.log(this.udpateDto.prescription)
      },
      (error) => {
        console.log("wrong responseee");
      }
    );
    let subButton = e.target as HTMLElement;
    subButton.style.display = "none";
    this.form.disable();
    this.formSubmitted[i] = true;
    this.cardButtonEnabled = new Array(this.visits?.length).fill(true);
    this.cardButtonEnabled[i] = false;
  }


  enableButton(index: number) {
    this.cardButtonEnabled[index] = true;
  }
}



