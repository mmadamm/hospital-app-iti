import { Component, OnInit } from '@angular/core'; 
import { AuthenticationService } from '../services/authService.service';
 import { GetMedicalHistoryByPhoneDto } from '../Types/GetMedicalHistoryByPhoneDto';
import { patiantMedicalHistory } from '../services/patientMedicalHistory.service';
import { LoadingService } from 'src/app/services/loading.service';
import { tap } from 'rxjs/operators'; 

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})

export class MedicalHistoryComponent implements OnInit {
  phoneNumber: string = '';
  userData: any;
  MedicalHistoryDto?: GetMedicalHistoryByPhoneDto;
  errorLoadingData: boolean = false;

  constructor(
    private patientMedicalHistory: patiantMedicalHistory,
    private loadingService : LoadingService
  ) {}

  ngOnInit(): void {
    this.getMedicalHistory();
  }

  getMedicalHistory() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      this.phoneNumber = this.userData.phoneNumber;
      console.log(this.phoneNumber);
      this.patientMedicalHistory.getMedicalHistory(this.phoneNumber).pipe(
        tap(() => {
          this.loadingService.setLoading(true); 
        })
      ).subscribe({
        next: (medicalHistory) => {
          this.MedicalHistoryDto = medicalHistory;
          console.log(this.MedicalHistoryDto);
        },
        error: (error) => {
          console.error('Calling API failed', error);
          this.errorLoadingData = true;
        },
        complete: () => {
          this.loadingService.setLoading(false); 
        },
      });
    }
  }
}