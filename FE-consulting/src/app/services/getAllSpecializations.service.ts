import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';

@Injectable({
  providedIn: 'root'
})
export class GetAllSpecializationsService {

  constructor(private client: HttpClient) { }
  public getAllSpecializations(): Observable<GetAllSpecializationsDto>{
    return this.client.get<GetAllSpecializationsDto>(`https://localhost:7267/api/Doctor/GetAllSpecialization`)
  }

}
