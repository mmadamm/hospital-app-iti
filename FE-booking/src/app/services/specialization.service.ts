import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private client: HttpClient) {}
    public GetAllSpecializations(): Observable<GetAllSpecializationsDto[]>{
      return this.client.get<GetAllSpecializationsDto[]>('https://localhost:7267/api/Doctor/GetAllSpecialization');
    }
}
