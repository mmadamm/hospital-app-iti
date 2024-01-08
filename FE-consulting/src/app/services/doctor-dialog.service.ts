import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from './doctor.service';
import { GetDoctorByIDDto } from '../types/GetDoctorrByIDDto';
import { BookDialog1Component } from '../book-dialog1/book-dialog1.component';
@Injectable({
  providedIn: 'root'
})
export class DoctorDialogService {

  
  data?:any;
  dataForLoginRegister?:any;
  isBooking : boolean = false
  constructor(private dialog : MatDialog, private doctorService : DoctorService) { }
  open(data: any,date:any){
   return this.dialog.open(BookDialog1Component,{
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
