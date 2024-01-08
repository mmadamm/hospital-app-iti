import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthenticationService } from '../services/authentication.service';
import { AdminService } from '../services/admin.service';
import { GetAdminByPhoneNumberDto } from '../types/GetAdminByPhoneNumberDto';
import { DoctorService } from '../services/doctor.service';
import { GetDoctorByIDDto } from '../types/GetDoctorrByIDDto';
import { GetDoctorByIDForAdminDto } from '../types/GetDoctorByIDForAdminDto';
import { ReceptionService } from '../services/reception.service';
import { GetReceptionByPhoneNumberDto } from '../types/GetReceptionByPhoneNumberDto';
import { ToggleSidebarService } from '../services/toggle-sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  admin? : GetAdminByPhoneNumberDto;
  doctor? : GetDoctorByIDForAdminDto;
  reception? : GetReceptionByPhoneNumberDto;
  phoneNumber?: string;
  isLoggedIn:boolean = false;
  isDoctorLoggedIn:boolean = false;
  isReceptionLoggedIn:boolean = false;
  isSideBarOpen?:boolean = true;

constructor(private authenticationService: AuthenticationService,
  private adminService: AdminService,
  private doctorService: DoctorService, 
  private receptionService: ReceptionService,
  private toggleSidebarService: ToggleSidebarService){}
  ngOnInit(): void {
    
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authenticationService.isDoctorLoggedIn$.subscribe((isDoctorLoggedIn) => {
      this.isDoctorLoggedIn = isDoctorLoggedIn;
    });
    this.authenticationService.isReceptionLoggedIn$.subscribe((isReceptionLoggedIn) => {
      this.isReceptionLoggedIn = isReceptionLoggedIn;
    });

    this.phoneNumber = localStorage.getItem('phoneNumber')!

    if(!this.phoneNumber){
      this.phoneNumber = this.authenticationService.PhoneNumber;
    }
    //#region admin
    if(this.isLoggedIn){
    this.adminService.getAdminByPhoneNumber(this.phoneNumber!).subscribe({
      next:(Admin) => {
        this.admin = Admin
      },
      error:(error) => {
        console.log('calling get admin by phone number api faild', error);
      }
    })
  }
  //#endregion
  //#region doctor
  else if(this.isDoctorLoggedIn){
    this.doctorService.GetDoctorByPhone(this.phoneNumber!).subscribe({
      next:(doctor) => {
        this.doctor = doctor
        console.log(this.doctor.imageUrl)
      },
      error:(error) => {
        console.log('calling get Doctor by phone number api faild', error);
        
      }
    })
  } else if(this.isReceptionLoggedIn){
    this.receptionService.GetReceptionByPhoneNumber(this.phoneNumber!).subscribe({
      next:(reception) => {
        this.reception = reception;
      },
      error: (error) => {
        console.log('calling get reception by phone number faild');
      }
    });
  }
  }
  signOut(e:Event){
    this.authenticationService.isLoggedIn$.next(false)
    this.authenticationService.isDoctorLoggedIn$.next(false)
    this.authenticationService.isReceptionLoggedIn$.next(false)
    localStorage.removeItem('AdminToken')
    localStorage.removeItem('DoctorToken')
    localStorage.removeItem('receptionToken')
    localStorage.removeItem('phoneNumber')
    localStorage.removeItem('DoctorId')
  } 
  toggleSideBar(event: Event): void {
    event.preventDefault();
    // console.log('Before toggle:', this.toggleSidebarService.isSideBarOpen$.value);
    this.toggleSidebarService.isSideBarOpen$.next(!this.toggleSidebarService.isSideBarOpen$.value);
    // console.log('After toggle:', this.toggleSidebarService.isSideBarOpen$.value);
  }
  
  
}
