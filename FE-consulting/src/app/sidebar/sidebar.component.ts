import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ToggleSidebarService } from '../services/toggle-sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isSidebarEnabled = true;
  private subscription: Subscription;

  isLoggedIn: boolean = false;
  isDoctorLoggedIn: boolean = false;
  isReceptionLoggedIn: boolean = false;
  isSideBarOpen?: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private toggleSidebarService: ToggleSidebarService
  ) {
    this.subscription = this.toggleSidebarService.isSideBarOpen$.subscribe(isOpen => {
      this.isSidebarEnabled = isOpen;
    });
  }

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
  }


}
