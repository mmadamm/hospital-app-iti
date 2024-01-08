import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAdminByPhoneNumberDto } from '../types/GetAdminByPhoneNumberDto';
import { GetAllSpecializationForAdminDto } from '../types/GetAllSpecializationForAdminDto';
import { UpdateAdminByPhoneDto } from '../types/UpdateAdminByPhoneDto';
import { GetRateAndReviewDto } from '../types/GetRateAndReviewDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client: HttpClient) { }
  public getAdminByPhoneNumber(phoneNumber: string): Observable<GetAdminByPhoneNumberDto>{
    return this.client.get<GetAdminByPhoneNumberDto>(`https://localhost:7267/api/Admins/Admin/${phoneNumber}`)
  }

  public getAllSpecializationsAndDoctors(): Observable<GetAllSpecializationForAdminDto[]>{
    return this.client.get<GetAllSpecializationForAdminDto[]>(`https://localhost:7267/api/Admins/Specializations`)
  }

  public updateAdminProfile(phoneNumber : string, admin : UpdateAdminByPhoneDto): Observable<object>{
    return this.client.put(`https://localhost:7267/api/Admins/admins/updateAdmin/${phoneNumber}`,admin);
  }
  public UploadPhoto(adminId : string, photo:FormData):Observable<object>{
    return this.client.post(`https://localhost:7267/api/Admins/admins/uploadimage/${adminId}`,photo);
  }
  public GetRateAndReviewByDocIdAndDate(date: string, id: string): Observable<GetRateAndReviewDto[]>{
    return this.client.get<GetRateAndReviewDto[]>(`https://localhost:7267/api/Admins/RateAndReview/${id}?date=${date}`)
  }
}
