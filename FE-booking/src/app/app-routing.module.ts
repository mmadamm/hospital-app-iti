import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './ourServices/services.component';
import { SpecializationComponent } from './specialization/specialization.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { QuestioinsComponent } from './questioins/questioins.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ErrorComponent } from './error/error.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ProfileComponent } from './profile/profile.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { AppointmentsComponent } from './appointments/appointments.component';


const routes: Routes = [
  {path:'',component:HeroComponent},
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {path:'header', component:HeaderComponent},
  {path: 'login', component:LoginComponent },
  {path:'register',component:RegisterComponent},
  {path:'hero',component:HeroComponent},
  {path:'about',component:AboutComponent},
  {path:'services',component:ServicesComponent},
  {path:'Specializations',component:SpecializationComponent},
  {path:'questioins',component:QuestioinsComponent},
  {path:'contact',component:ContactComponent},
  {path:'footer',component:FooterComponent},
  {path:'doctor',component:DoctorComponent},
  {path:'profile',component:ProfileComponent},
  {path:'medical-history',component:MedicalHistoryComponent},
  {path:'appointments',component:AppointmentsComponent},
  {path:'**',component:ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
