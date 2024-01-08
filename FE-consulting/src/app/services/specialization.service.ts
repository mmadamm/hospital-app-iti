import { Injectable } from '@angular/core';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private client :HttpClient) { }
  public GetAllSpecializations(): Observable<GetAllSpecializationsDto[]>{
    return this.client.get<GetAllSpecializationsDto[]>('https://localhost:7267/api/Doctor/GetAllSpecialization');
  }

}
