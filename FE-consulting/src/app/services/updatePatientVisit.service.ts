import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdatePatientVisitDto } from '../types/UpdatePatientVisitDto';

@Injectable({
  providedIn: 'root'
})
export class UpdatePatientVisitService {

  constructor(private client: HttpClient) { }

  public updatePatientVisit(updateDto: UpdatePatientVisitDto): Observable<any> {
    return this.client.put<any>(`https://localhost:7267/api/Doctor/PatientVisit`, updateDto);
  }
}
