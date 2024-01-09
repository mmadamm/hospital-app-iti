import { Component } from '@angular/core';
import { PatientService } from '../services/patientByPhoneNumber.service';
import { GetPatientVisitDto } from '../types/GetPatientVisitDto';
import { PatientService2 } from '../services/patient.service';
import { empty } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css']
})

export interface GetPatientVisitsChildDTO {
  // ... other properties ...
  doctorName: string;
}

export class PatientVisitsComponent {
  patientPhoneNumber?: string; // Corrected the variable name
  patientVisits?: GetPatientVisitDto; // Corrected the variable name

  constructor(private patientService: PatientService2) { }

  search() {
    if (!this.patientPhoneNumber) { // Corrected the variable name
      return;
    }

    this.patientService.GetPatientVisitsByPhone(this.patientPhoneNumber).subscribe({
      next: (patientVisits) => {
        this.patientVisits = patientVisits;
      },
      error: (error) => {
        console.error('Error fetching visits:', error);
      },
    });
  }

  delete(e: Event, id: number) {
    this.showConfirmation(id);
  }

  showConfirmation(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete visit?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) { // Check if user clicked "Yes"
        this.patientService.deleteAppointment(id).subscribe({
          next: () => {
            this.patientService.GetPatientVisitsByPhone(this.patientPhoneNumber!).subscribe({
              next: (patientVisits) => {
                this.patientVisits = patientVisits;
              },
              error: (error) => {
                console.error('Error fetching visits:', error);
              },
            });
          },
          error: (error) => {
            console.log('Delete patient visit API failed', error);
          }
        });

        Swal.fire('Deleted!', 'Your visit has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your file is safe :)', 'info');
      }
    });
  }
}
