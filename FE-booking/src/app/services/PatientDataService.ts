import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientDataService {
  constructor(private client: HttpClient) {}
  public getPatientData(phoneNumber: string): Observable<any> {
    const apiUrl = `https://localhost:7267/api/Patient/patient/${phoneNumber}`;
    // Adjust the actual API request based on your API
    return this.client.get(apiUrl);
  }}