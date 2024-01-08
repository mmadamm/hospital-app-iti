import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBetweenAddDrDrProfileService {

  private doctorId = new BehaviorSubject<string>('0');
  currentDoctorId = this.doctorId.asObservable();
  constructor() { }
  
  changeDoctorId(dId : string){
    this.doctorId.next(dId)
  }
}
