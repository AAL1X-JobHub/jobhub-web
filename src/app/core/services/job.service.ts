import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JobCreateUpdateRequest } from '../../shared/models/job-create-update-request.model';
import { JobDetailsResponse } from '../../shared/models/job-details-response.model';
import { PageableResponse } from '../../shared/models/pageable-response.model';
import { CompanyJobSalesReportDTO } from '../../shared/models/company-job-sales-report.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseURL = `${environment.apiURL}/admin/jobs`;
  private http = inject(HttpClient);

  getJobDetails(): Observable<JobDetailsResponse[]> {
    return this.http.get<JobDetailsResponse[]>(`${this.baseURL}`);
  }

  paginateJobs(page: number, size: number): Observable<PageableResponse<JobDetailsResponse>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageableResponse<JobDetailsResponse>>(`${this.baseURL}/page`, { params });
  }

  createJob(job: JobCreateUpdateRequest): Observable<JobDetailsResponse> {
    return this.http.post<JobDetailsResponse>(`${this.baseURL}`, job);
  }


  getJobDetailsById(id: number): Observable<JobDetailsResponse> {
    return this.http.get<JobDetailsResponse>(`${this.baseURL}/${id}`);
  }


  updateJob(id: number, job: JobCreateUpdateRequest): Observable<JobDetailsResponse> {
    return this.http.put<JobDetailsResponse>(`${this.baseURL}/${id}`, job);
  }


  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

  getAuthorJobSalesReport(): Observable<CompanyJobSalesReportDTO[]> {
    return this.http.get<CompanyJobSalesReportDTO[]>(`${this.baseURL}/sales-report`);
  }
}