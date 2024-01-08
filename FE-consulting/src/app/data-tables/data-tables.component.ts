import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { GetAllSpecializationForAdminDto } from '../types/GetAllSpecializationForAdminDto';

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit{
  Specializations?: GetAllSpecializationForAdminDto[]
  constructor(private adminService : AdminService){}
  ngOnInit(): void {
    this.adminService.getAllSpecializationsAndDoctors().subscribe({
      next:(Specializations) => {
        this.Specializations = Specializations
        console.log(Specializations)
      },
      error:(error) => {
        console.log('calling get admin by phone number api faild', error);
      }
    })
  }
}


