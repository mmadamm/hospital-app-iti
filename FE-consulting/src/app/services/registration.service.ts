import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ReceptionRegisterDto } from '../types/RegisterReceptionDto';
import { RegisterAdminDto } from '../types/RegisterAdminDto';
import {RegisterPatientDto} from '../types/RegisterPatientDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class registrationService {

  constructor(private client : HttpClient) { }

  public registerReception(register : ReceptionRegisterDto) : Observable<object>{
    return this.client.post(`https://localhost:7267/api/Doctor/reception/register`,register);
  }

  public registerAdmin(register : RegisterAdminDto) : Observable<object>{
    return this.client.post(`https://localhost:7267/api/Admins/Admins/register`,register);
  }
  public registerPatient(register : RegisterPatientDto) : Observable<object>{
    return this.client.post(`https://localhost:7267/api/Patient/register`,register);
  }

}