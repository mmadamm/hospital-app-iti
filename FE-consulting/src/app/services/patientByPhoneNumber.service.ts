import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPatientByPhoneDTO } from '../types/GetPatientByPhoneNumberDto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private client: HttpClient) { }
  public getPatientByPhoneNumber(phoneNumber: string): Observable<GetPatientByPhoneDTO>{
    return this.client.get<GetPatientByPhoneDTO>(`https://localhost:7267/api/Patient/patient/${phoneNumber}`)
  }

}
