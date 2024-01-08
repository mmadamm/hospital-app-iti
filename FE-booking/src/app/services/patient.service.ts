import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPatientByPhoneDTO } from '../Types/GetPatientByPhoneDto';
import { Observable } from 'rxjs';
import { AddPatientVisitDto } from '../Types/AddPatientVisitDto';
import { GetAllPatientsWithDateDto } from '../Types/GetAllPatientWithDateDto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private client : HttpClient) { }
  public getPatientByPhoneNumber(PhoneNumber: string): Observable<GetPatientByPhoneDTO>{
    return this.client.get<GetPatientByPhoneDTO>(`https://localhost:7267/api/Patient/patient/${PhoneNumber}`);
  }


  public addPatientVisit(patientVisit? : AddPatientVisitDto): Observable<object>{
    return this.client.post(`https://localhost:7267/addpatientVisit`, patientVisit);
  }

  public GetAllPatientWithVisitDate(date : string, drId : string ):Observable<GetAllPatientsWithDateDto[]>{
    return this.client.get<GetAllPatientsWithDateDto[]>(`https://localhost:7267/api/Doctor/dailySchedule/${date}?DoctorId=${drId}`);
  }
  
  public deleteAppointment (patientVisitId : number):Observable<object>{
    return this.client.delete(`https://localhost:7267/api/Patient/deletepatientvisit/${patientVisitId}`)
  }
}
