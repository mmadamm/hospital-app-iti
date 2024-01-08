import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTopRatedDoctorsDto } from '../types/GetTopRatedDoctorsDto';

@Injectable({
  providedIn: 'root'
})
export class GetTopRatedDoctorsService {

  constructor(private client: HttpClient) { }
  public getTopRatedDoctors(): Observable<GetTopRatedDoctorsDto>{
    return this.client.get<GetTopRatedDoctorsDto>(`https://localhost:7267/api/Admins/AverageRateForDoctors`)
  }

}
