import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'https://localhost:7267/api/Patient/patient_visits';

  constructor(private http: HttpClient) {}

  getAppointmentsByPhoneNumber(phoneNumber: string): Observable<any> {
    const url = `${this.apiUrl}/${phoneNumber}`;
    return this.http.get(url);
  }
}
