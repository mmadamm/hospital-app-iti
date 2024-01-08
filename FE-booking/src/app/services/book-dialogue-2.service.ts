import { Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DoctorService } from './doctor.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';
import { BookDialog2Component } from '../book-dialog2/book-dialog2.component';


@Injectable({
  providedIn: 'root'
})
export class BookDialogue2Service {

  constructor(private dialog : MatDialog, private bookComponent : BookDialog2Component, @Inject(MAT_DIALOG_DATA) public data : any ) { }
open(data:any){
  return this.dialog.open(BookDialog2Component,{
    data:data
  });
}

}
