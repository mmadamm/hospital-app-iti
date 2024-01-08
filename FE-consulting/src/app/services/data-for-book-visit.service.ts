import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataForBookVisitService {

  private specializationId =  new BehaviorSubject<number>(0);
  private doctorId = new BehaviorSubject<string>('0');
  currentId = this.specializationId.asObservable();
  currentDoctorId = this.doctorId.asObservable();
  constructor() { }

  changeSpecializationId(sId : number){
    this.specializationId.next(sId)
  }
  changeDoctorId(dId : string){
    this.doctorId.next(dId)
  }

}
