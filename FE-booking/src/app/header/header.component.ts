import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authService.service';
import { PatientLoginDto } from '../Types/PatientLoginDto';
import { RegisterPatientDto } from '../Types/PatientRegisterDto';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navBarisLoggedIn = false;
  username: string = '';
  constructor(private authenticationService:AuthenticationService){}

  logout(): void {
    this.authenticationService.logout();
  }
  ngOnInit(): void {
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.navBarisLoggedIn = isLoggedIn;
      this.username = localStorage.getItem('username') ?? '';
      if (isLoggedIn) {
        // this.username = this.authenticationService.getUsername(); // Replace with your actual method to get the username
        this.username = localStorage.getItem('username') ?? '';
      }
    });

}
}


