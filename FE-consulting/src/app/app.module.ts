import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { GenralTablesComponent } from './genral-tables/genral-tables.component';
import { DataTablesComponent } from './data-tables/data-tables.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { SpecializtionComponent } from './specializtion/specializtion.component';
import { NgToastModule } from 'ng-angular-popup';
import { MyDoctorProfileComponent } from './my-doctor-profile/my-doctor-profile.component';
import { BookVisitComponent } from './book-visit/book-visit.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { BookDialog1Component } from './book-dialog1/book-dialog1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReceptionRegisterComponent } from './reception-register/reception-register.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { ReceptionProfileComponent } from './reception-profile/reception-profile.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PatientVisitsComponent } from './patient-visits/patient-visits.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    FormsComponent,
    FormLayoutComponent,
    GenralTablesComponent,
    DataTablesComponent,
    DoctorProfileComponent,
    LoginComponent,
    AdminProfileComponent,
    PatientProfileComponent,
    MyDoctorProfileComponent,
    SpecializtionComponent,
    BookVisitComponent,
    BookAppointmentComponent,
    BookDialog1Component,
    ReceptionRegisterComponent,
    AdminRegisterComponent,
    ReceptionProfileComponent,
    PatientRegisterComponent,
    PatientVisitsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
