import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // Import the map operator
import { PatientDataService } from './PatientDataService';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface PatientData {
  name: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class CheckingPhoneNumber {
  private apiUrl = 'https://localhost:7267/api/Patient/patient';

  constructor(private http: HttpClient) {}


  checkPhoneNumberExists(phoneNumber: string): Observable<boolean> {
    console.log('this.apiurl: ', this.apiUrl);
    const url = `${this.apiUrl}/${phoneNumber}`;
    console.log('API URL:', url);

    return this.http.get<PatientData>(url).pipe(
      map((patientData: PatientData) => {
        console.log('Received Patient Data:', patientData);
        const phoneNumberExists = !!patientData;
        console.log('Phone Number Exists:', phoneNumberExists);
        return phoneNumberExists;
      }),
      catchError(() => {

        console.error('Error occurred during API request');
        return of(false); // Return false in case of error
      })
    );
  }

}











/////////////////////////////////// Draft

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { PatientDataService } from './PatientDataService';

// @Injectable({
//   providedIn: 'root',
// })

// interface PatientData {

//   name: string;


// }

// export class CheckingPhoneNumber {
//   private apiUrl = 'https://localhost:7267/api/Patient/patient/';

//   constructor(private http: HttpClient) {}

//   checkPhoneNumberExists(phoneNumber: string): Observable<boolean> {
//     return this.http.get<PatientData>(`${this.apiUrl}/${phoneNumber}`).pipe(
//       map((patientData : PatientData )=> !!patientData) // Returns true if patientData exists, false otherwise
//     );
//   }
// }


////////////////////////////////
//2nd
  // checkPhoneNumberExists(phoneNumber: string): Observable<boolean> {
  //   return this.http.get<PatientData>(`${this.apiUrl}/${phoneNumber}`).pipe(
  //     map((patientData: PatientData) => !!patientData) // Returns true if patientData exists, false otherwise
  //   );
  // }
  // checkPhoneNumberExists(phoneNumber: string): Observable<boolean> {
  //   console.log('this.apiurl: ',this.apiUrl)
  //   const url = `${this.apiUrl}/${phoneNumber}`;
  //   console.log('API URL:', url);

  //   return this.http.get<PatientData>(url).pipe(
  //     map((patientData: PatientData) => {
  //       console.log('Received Patient Data:', patientData);
  //       console.log(!!patientData);
  //       return !!patientData;
  //     })
  //   );

  // }
