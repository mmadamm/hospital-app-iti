import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddSpecializationService {

  constructor(private client: HttpClient) { }
  public addSpecialization(specializationName: string): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.client.post<void>('https://localhost:7267/api/Admins/Admins/AddSpecialization', { name: specializationName }, { headers });
  }
}
