

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class patientProfile {
  private apiUrl = 'https://localhost:7267/api/Patient/patient';

  constructor(private http: HttpClient) {}

  getUserData(phoneNumber:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${phoneNumber}`);
  }
}
