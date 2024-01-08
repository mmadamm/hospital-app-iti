import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from './doctor.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';

@Injectable({
  providedIn: 'root'
})
export class DoctorDialogueService {
  data?:any;
  dataForLoginRegister?:any;
  isBooking : boolean = false
  constructor(private dialog : MatDialog, private doctorService : DoctorService) { }
  open(data: any,date:any){
   return this.dialog.open(BookDialogueComponent,{
    data:{data,date}
   });
  }
  
  sendDataToLoginOrRegister(data : any, isbooking : boolean){
    this.dataForLoginRegister = data
    this.isBooking = isbooking
  }
  close(){
    this.dialog.closeAll()
  }
  
}
