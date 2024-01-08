import { Component, OnInit } from '@angular/core';
import { ReceptionService } from '../services/reception.service';
import { AuthenticationService } from '../services/authentication.service';
import { GetReceptionByPhoneNumberDto } from '../types/GetReceptionByPhoneNumberDto';

@Component({
  selector: 'app-reception-profile',
  templateUrl: './reception-profile.component.html',
  styleUrls: ['./reception-profile.component.css']
})
export class ReceptionProfileComponent implements OnInit{
  phoneNumber?: string;
  reception?: GetReceptionByPhoneNumberDto;
  constructor(private receptionService : ReceptionService,
    private authenticationService : AuthenticationService){}
  ngOnInit(): void {

    this.phoneNumber = localStorage.getItem('phoneNumber')!

    if(!this.phoneNumber){
      this.phoneNumber = this.authenticationService.PhoneNumber;
    }
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
