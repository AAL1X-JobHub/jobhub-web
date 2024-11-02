// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { JobDetailsResponse } from '../../shared/models/job-details-response.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseURL = `${environment.apiURL}/jobs`;

  constructor(private http: HttpClient) {}

  getRecentJobs(): Observable<JobDetailsResponse[]> {
    return this.http.get<JobDetailsResponse[]>(`${this.baseURL}/recent`);
  }

  getJobDetailsById(id: number): Observable<JobDetailsResponse> {
    return this.http.get<JobDetailsResponse>(`${this.baseURL}/${id}`);
  }
}