import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { Observable } from 'rxjs';
import { GetDoctorsBySpecializationDto } from '../Types/GetDoctorsBySpecializationDto';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { VisitCountDto } from '../Types/VisitCountDto';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private client: HttpClient) { }
  public getDoctors(): Observable<GetAllDoctorsDto[]>{
    return this.client.get<GetAllDoctorsDto[]>('https://localhost:7267/api/Doctor');
  }
  public getDoctorsBySpecialization(id : number): Observable<GetDoctorsBySpecializationDto[]>{
    return this.client.get<GetDoctorsBySpecializationDto[]>(`https://localhost:7267/api/Doctor/doctors/specialization/${id}`);
  }
  public getDoctorById(id: string): Observable<GetDoctorByIDDto>{
    return this.client.get<GetDoctorByIDDto>(`https://localhost:7267/api/Doctor/doctors/${id}`);
  }
  public GetAllSpecializations(): Observable<GetAllSpecializationsDto[]>{
    return this.client.get<GetAllSpecializationsDto[]>('https://localhost:7267/api/Doctor/GetAllSpecialization');}

  public GetVisitCount(date : string, drId : string ):Observable<VisitCountDto>{
    return this.client.get<VisitCountDto>(`https://localhost:7267/api/Doctor/visitCount/${date}?DoctorId=${drId}`);
  }
  public GetVisitCountForWeek(date: string , date2 : string ,drId : string): Observable<VisitCountDto[]>{
    return this.client.get<VisitCountDto[]>(`https://localhost:7267/api/Doctor/visitCount/${date}/${date2}?DoctorId=${drId}`);
  }
  
  }

