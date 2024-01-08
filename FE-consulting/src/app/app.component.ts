import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ToggleSidebarService } from './services/toggle-sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn:boolean = false;
  isDoctorLoggedIn:boolean = false;
  isReceptionLoggedIn:boolean = false;
  isSidebarOpen?: boolean;
  constructor(private authenticationService: AuthenticationService,
    public toggleSidebarService: ToggleSidebarService){
      this.toggleSidebarService.isSideBarOpen$.subscribe(isOpen => {
        this.isSidebarOpen = isOpen});
    }

  ngOnInit(): void {
    if(localStorage.getItem('AdminToken')){
      this.authenticationService.isLoggedIn$.next(true);
    }
    else if(localStorage.getItem('DoctorToken')){
      this.authenticationService.isDoctorLoggedIn$.next(true);
    }
    else if(localStorage.getItem('receptionToken')){
      this.authenticationService.isReceptionLoggedIn$.next(true);
    }
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authenticationService.isDoctorLoggedIn$.subscribe((isDoctorLoggedIn) => {
      this.isDoctorLoggedIn = isDoctorLoggedIn;
    });
    this.authenticationService.isReceptionLoggedIn$.subscribe((isReceptionLoggedIn) => {
      this.isReceptionLoggedIn = isReceptionLoggedIn;
    });
  }
  get sidebarOpen(): boolean {
    return this.toggleSidebarService.isSideBarOpen$.value;
  }
}
