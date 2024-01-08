import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CommonModule } from '@angular/common';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
 import {MatDialogModule} from '@angular/material/dialog';
 import {MatButtonModule} from '@angular/material/button';
import { BookDialogueComponent } from './book-dialogue/book-dialogue.component';
import { BookDialog2Component } from './book-dialog2/book-dialog2.component';
import { ContinueBookingComponent } from './continue-booking/continue-booking.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingService } from './services/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    SpecializationComponent,
    ContactComponent,
    FooterComponent,
    QuestioinsComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    DoctorComponent,
    ProfileComponent,
    AppointmentsComponent,
    MedicalHistoryComponent,
    BookDialogueComponent,
    BookDialog2Component,
    ContinueBookingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
