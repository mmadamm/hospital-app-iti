import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import VisitReviewAndRateDto from '../Types/VisitReviewAndRateDto';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://localhost:7267/api/Patient/reviews';

  constructor(private http: HttpClient) {}

  postRateAndReview(visitReviewAndRateDto: VisitReviewAndRateDto): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.put(url, visitReviewAndRateDto);
  }
}
