import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetMedicalHistoryByPhoneDto } from '../Types/GetMedicalHistoryByPhoneDto';

@Injectable({
    providedIn: 'root',
  })
  export class patiantMedicalHistory {
    constructor(private client: HttpClient) {}
  
    public getMedicalHistory(phoneNumber: string): Observable<GetMedicalHistoryByPhoneDto> {
      return this.client.get<GetMedicalHistoryByPhoneDto>(
        `https://localhost:7267/api/Patient/medical_history/${phoneNumber}`
      );
    }
  }