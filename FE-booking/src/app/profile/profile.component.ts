import { Component, OnInit } from '@angular/core';
import { patientProfile } from '../services/patientProfile.service';
import { AuthenticationService } from '../services/authService.service';
import { PatientLoginDto } from '../Types/PatientLoginDto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe],
})
export class ProfileComponent implements OnInit {
  userData: any; // Change the type according to your API response structure
  phoneNumber:string = '';
  // dob: any ;
  constructor(private patientProfile: patientProfile , private authService: AuthenticationService) {}

  ngOnInit() {
    this.getUserData();
  }
  getUserData() {
      // Assume your login service has a method to get the loginDto
      this.phoneNumber = this.authService.getPhoneNumber();
      console.log(this.phoneNumber);

       // Retrieve user data from localStorage
      const storedUserData = localStorage.getItem('userData');
      // const dob = localStorage.getItem('dob');
      if (storedUserData) {
        this.userData = JSON.parse(storedUserData);

         // If user data is not available in localStorage, fetch it from the server
        this.patientProfile.getUserData(this.phoneNumber).subscribe(
          (data) => {
            this.userData = data;
            console.log(this.userData);
            console.log(this.userData.name);
          },
          (error) => {
            console.error('Error fetching user data', error);
          }
        );
      }
  }
}



    //   if(dob){
      //     this.dob = dob;
      //   }
      // } else {

      /////////////////////////////
    // this.patientProfile.getUserData(this.phoneNumber).subscribe(
    //   (data) => {
    //     this.userData = data;
    //     console.log(this.userData);
    //     console.log(this.userData.name);
    //   },
    //   (error) => {
    //     console.error('Error fetching user data', error);
    //   }
    // );
