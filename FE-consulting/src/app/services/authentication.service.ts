import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../types/LoginDto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenDto } from '../types/TokenDto';
import { DoctorService } from './doctor.service';
import { GetDoctorByPhoneDto } from '../types/GetDoctorByPhoneDto';
import { GetDoctorByIDForAdminDto } from '../types/GetDoctorByIDForAdminDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  PhoneNumber?:string;
  doctor?: GetDoctorByIDForAdminDto;
  doctorId?: string;
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isDoctorLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isReceptionLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient,
    private doctorService: DoctorService ) { }
  public login(credentials: LoginDto , isRememberable?: boolean ): Observable<TokenDto>{
    return this.client
    .post<TokenDto>('https://localhost:7267/api/Admins/Admins/login',credentials)
    .pipe(
      tap((tokenDto) => {
        this.isLoggedIn$.next(true);
        if(isRememberable){
          localStorage.setItem('AdminToken' , tokenDto.token);
          localStorage.setItem('phoneNumber', credentials.phoneNumber);
        }
      })
    )
  }

//#region Doctor Login
  public Doctorlogin(credentials: LoginDto , isRememberable?: boolean): Observable<TokenDto>{
    this.doctorService.GetDoctorByPhone(credentials.phoneNumber).subscribe({
      next:(doctor) => {
        // this.doctor = doctor
       localStorage.setItem('DoctorId', doctor.id!);
      },
      error:(error) => {
        console.log('calling get Doctor by phone number api faild', error);
        
      }
    })
    return this.client
    .post<TokenDto>('https://localhost:7267/api/Doctor/Doctor/login',credentials)
    .pipe(
      tap((tokenDto) => {
        this.isDoctorLoggedIn$.next(true);
        if(isRememberable){
          localStorage.setItem('DoctorToken' , tokenDto.token);
          localStorage.setItem('phoneNumber', credentials.phoneNumber);
        }
      })
    )
  }

  public receptionLogin(credentials: LoginDto , isRememberable?: boolean): Observable<TokenDto>{
    return this.client
    .post<TokenDto>('https://localhost:7267/api/Doctor/reception/login',credentials)
    .pipe(
      tap((tokenDto) => {
        this.isReceptionLoggedIn$.next(true);
        if(isRememberable){
          localStorage.setItem('receptionToken' , tokenDto.token);
          localStorage.setItem('phoneNumber', credentials.phoneNumber);
        }
      })
    )
  }
//#endregion
}
