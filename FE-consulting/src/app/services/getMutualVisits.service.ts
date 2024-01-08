import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GetPatientVisitsChildDTO } from '../types/GetPatientVisitChildDto';

@Injectable({
  providedIn: 'root'
})
export class MutualVisitsService {

  constructor(private client: HttpClient) { }
  public getMutualVisits(patientPhoneNumber: string , doctorPhoneNumber:string): Observable<GetPatientVisitsChildDTO>{
    return this.client.get<GetPatientVisitsChildDTO>(`https://localhost:7267/api/Doctor/mutualvisits?patientPhone=${patientPhoneNumber}&doctorPhone=${doctorPhoneNumber}`)
  }

}
