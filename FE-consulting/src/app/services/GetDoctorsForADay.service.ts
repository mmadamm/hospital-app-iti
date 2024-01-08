import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDoctorForADayService {

  constructor(private client: HttpClient) { }
  public getDoctorForADay(today:any): Observable<number>{
    return this.client.get<number>(`https://localhost:7267/api/Admins/NumberOfAvailableDoctorsForADay?date=${today}`)
  }

}
