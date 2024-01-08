import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberBetweenDashboardAndPatientProfileService {
  private PatientPhoneNumber = new BehaviorSubject<string>('0');
  currentPhoneNumber = this.PatientPhoneNumber.asObservable();

  constructor() { }
  
  ChangePatientPhoneNumber(PatientPhoneNumber : string){
    this.PatientPhoneNumber.next(PatientPhoneNumber)
  }

}
