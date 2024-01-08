import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AuthenticationService } from '../services/authentication.service';
import { GetAdminByPhoneNumberDto } from '../types/GetAdminByPhoneNumberDto';
import { UpdateAdminByPhoneDto } from '../types/UpdateAdminByPhoneDto';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit{
  admin? : GetAdminByPhoneNumberDto;
  phoneNumber?: string;
  updateAdmin? : UpdateAdminByPhoneDto;
  formData?: FormData = new FormData();
  file?: File
  
constructor(private adminservice: AdminService ,
  private authenticationservice: AuthenticationService,
  private toast: NgToastService){}

  @ViewChild('form') form : NgForm | undefined ;


  ngOnInit(): void {
    this.phoneNumber = localStorage.getItem('phoneNumber')!
    if(!this.phoneNumber){
      this.phoneNumber = this.authenticationservice.PhoneNumber;
    }
    console.log(this.phoneNumber)
    this.adminservice.getAdminByPhoneNumber(this.phoneNumber!).subscribe({
      next:(Admin) => {
        this.admin = Admin
        console.log(Admin)
      },
      error:(error) => {
        console.log('calling get admin by phone number api faild', error);
      }
    })
  }

  onEdit(){

    this.form?.setValue({
      name : this.admin?.name,
      phoneNumber : this.admin?.phoneNumber
    })
  }
  private showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Admin profile updated successfully', duration: 9000 });
  }
  photoFile(e: Event){
    this.file = (e.target as HTMLInputElement).files![0];
    this.formData?.append('imageFile', this.file);
 }
  onSave(e : Event, form : any){
    e.preventDefault();
    

      this.updateAdmin = {
        id : this.admin?.id!,
        name: this.form?.value.name,
        phoneNumber : this.form?.value.phoneNumber,
      }
      console.log(this.updateAdmin)

      this.adminservice.updateAdminProfile(this.admin?.phoneNumber!,this.updateAdmin).subscribe({
        next:()=>{
          this.adminservice.getAdminByPhoneNumber(this.updateAdmin?.phoneNumber!).subscribe({
            next:(Admin) => {
              this.admin = Admin
              // console.log(Admin)
              this.showSuccess()
            },
            error:(error) => {
              console.log('calling get admin by phone number api faild', error);
            }
          })
        
        },
        error:(error)=>{
          console.log("update api failed",error)
        }
      })
    
  }
}

