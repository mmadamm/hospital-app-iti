import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { doctorAuthGuard } from './gurds/doctor-auth.guard';
import { MyDoctorProfileComponent } from './my-doctor-profile/my-doctor-profile.component';
import { adminAuthGuard } from './gurds/admin-auth.guard';
import { SpecializtionComponent } from './specializtion/specializtion.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { ReceptionRegisterComponent } from './reception-register/reception-register.component';
import { receptionAuthGuard } from './gurds/reception-auth.guard';
import { ReceptionProfileComponent } from './reception-profile/reception-profile.component';
import { BookVisitComponent } from './book-visit/book-visit.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';

import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PatientVisitsComponent } from './patient-visits/patient-visits.component';

const routes: Routes = [
  {path: '' , component:DashboardComponent},
  {path: 'header',component:HeaderComponent},
  {path: 'footer' , component:FooterComponent},
  {path: 'sidebar' , component:SidebarComponent},
  {path: 'dashboard' , component:DashboardComponent},
  {path : 'forms' , component : FormsComponent},
  {path : 'formsLayout' , component : FormLayoutComponent},
  {path : 'genralTables' , component : GenralTablesComponent},
  {path : 'dataTables' ,canActivate: [adminAuthGuard], component : DataTablesComponent},
  {path : 'doctorProfile' ,canActivate: [adminAuthGuard], component : DoctorProfileComponent},
  {path : 'adminProfile' ,canActivate: [adminAuthGuard], component : AdminProfileComponent},
  {path : 'patientProfile', canActivate: [doctorAuthGuard] ,component : PatientProfileComponent},
  {path : 'patientProfile', canActivate: [receptionAuthGuard] ,component : PatientProfileComponent},
  {path: 'myDoctorProfile' , canActivate: [doctorAuthGuard], component : MyDoctorProfileComponent},
  {path : 'specialization' ,canActivate: [adminAuthGuard], component : SpecializtionComponent},
  {path: 'adminRegister', canActivate: [adminAuthGuard], component:AdminRegisterComponent},
  {path: 'receptionRegister',canActivate: [adminAuthGuard], component:ReceptionRegisterComponent},
  {path: 'receptionProfile', canActivate: [receptionAuthGuard], component: ReceptionProfileComponent },
  {path: 'PatientRegister',component:PatientRegisterComponent},
  {path : 'bookAppointment' , canActivate: [receptionAuthGuard], component : BookAppointmentComponent},
  {path: 'patientsVisits' , component: PatientVisitsComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
