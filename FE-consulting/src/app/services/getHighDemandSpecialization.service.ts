import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDoctorsVisitsNumberDto } from '../types/GetDoctorVisitsNumberDto';

@Injectable({
  providedIn: 'root'
})
export class GetHighDemandSpecializationService {

  constructor(private client: HttpClient) { }
  public getHighDemandSpecialization(firstDate:any , secondDate:any , specializationId:number): Observable<GetDoctorsVisitsNumberDto>{
    return this.client.get<GetDoctorsVisitsNumberDto>(`https://localhost:7267/api/Admins/PatientVisitsInAPeriodAndSpecialization?startDate=${firstDate}&endDate=${secondDate}&specializationId=${specializationId}`)
  }

}
