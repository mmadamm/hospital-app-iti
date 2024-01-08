import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterDoctorDto } from '../types/RegisterDoctorDto';
import { Observable } from 'rxjs';
import { GetDoctorByPhoneDto } from '../types/GetDoctorByPhoneDto';
import { GetDoctorByIDDto } from '../types/GetDoctorrByIDDto';
import { UpdateDoctorStatusDto } from '../types/UpdateDoctorStatusDto';
import { GetAllDoctorsDto } from '../types/GetAllDoctorsDto';
import { GetDoctorsBySpecializationDto } from '../types/GetDoctorsBySpecializationDto';
import { GetDoctorByIDForAdminDto } from '../types/GetDoctorByIDForAdminDto';
import { AddWeekScheduleDto } from '../types/AddWeekScheduleDto';
import { WeekScheduleForDoctorsDto } from '../types/WeekScheduleForDoctorsDto';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { GetAllPatientsWithDateDto } from '../types/GetAllPatientsWithDateDto';
import { VisitCountDto } from '../types/VisitCountDto';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private client : HttpClient) { }

  public registerDoctor(register : RegisterDoctorDto) : Observable<object>{
    return this.client.post(`https://localhost:7267/api/Doctor/Doctor/register`,register);
  }
  public GetAllSpecializations(): Observable<GetAllSpecializationsDto[]>{
    return this.client.get<GetAllSpecializationsDto[]>('https://localhost:7267/api/Doctor/GetAllSpecialization');}

    public UploadPhoto(drId : string, photo:FormData):Observable<object>{
      return this.client.post(`https://localhost:7267/api/Doctor/doctors/uploadimage/${drId}`,photo);
    }
    public GetDoctorByPhone(phone : string ): Observable<GetDoctorByIDForAdminDto>{
      return this.client.get<GetDoctorByIDForAdminDto>(`https://localhost:7267/api/Doctor/doctor/${phone}`);
    }
    public getDoctorById(id: string): Observable<GetDoctorByIDDto>{
      return this.client.get<GetDoctorByIDDto>(`https://localhost:7267/api/Doctor/doctors/${id}`);
    }
    public getDoctors(): Observable<GetAllDoctorsDto[]>{
      return this.client.get<GetAllDoctorsDto[]>('https://localhost:7267/api/Doctor');
    }
    public getDoctorsBySpecialization(id : number): Observable<GetDoctorsBySpecializationDto[]>{
      return this.client.get<GetDoctorsBySpecializationDto[]>(`https://localhost:7267/api/Doctor/doctors/specialization/${id}`);
    }
    
   public UpdateDoctor(drId:string, doctor : UpdateDoctorStatusDto):Observable<object>{
    return this.client.put(`https://localhost:7267/api/Admins/admins/updatedoctor/${drId}`,doctor);
   }

   public getDoctorByIdForAdmin(id:string): Observable<GetDoctorByIDForAdminDto>{
    return this.client.get<GetDoctorByIDForAdminDto>(`https://localhost:7267/api/Admins/admin/getDoctorForAdmin/${id}`);
  }
  public getAllPatientsWithDates(date : string , DoctorId : string): Observable<GetAllPatientsWithDateDto[]>{
    return this.client.get<GetAllPatientsWithDateDto[]>(`https://localhost:7267/api/Doctor/dailySchedule/${date}?DoctorId=${DoctorId}`)
  }
   
   public addWeekSchedule(schedule : AddWeekScheduleDto): Observable<object>{
    return this.client.post(`https://localhost:7267/addWeekSchedule`,schedule);
   }
   public updateWeekScheduleRecord(schedule : WeekScheduleForDoctorsDto, id:number):Observable<object>{
    return this.client.put(`https://localhost:7267/api/Admins/admins/updateWeekSchedule/${id}`,schedule);
   }

   public addVisitCount(startDate : string, endDate: string):Observable<object>{
    return this.client.post(`https://localhost:7267/api/Doctor/addVisitCount/${startDate}?EndDate=${endDate}`,endDate)
   }
   public GetVisitCountForWeek(date: string , date2 : string ,drId : string): Observable<VisitCountDto[]>{
    return this.client.get<VisitCountDto[]>(`https://localhost:7267/api/Doctor/visitCount/${date}/${date2}?DoctorId=${drId}`);
  }
  }