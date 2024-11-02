import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { JobCardComponent } from '../../../shared/components/job-card/job-card.component';
import { JobDetailsResponse } from '../../../shared/models/job-details-response.model';
import { HomeService } from '../../../core/services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, JobCardComponent ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentJobs: JobDetailsResponse[] = [];
  filteredJobs: JobDetailsResponse[] = [];
  searchQuery: string = '';

  private jobService = inject(HomeService);

  constructor() {}

  ngOnInit(): void {
    this.jobService.getRecentJobs().subscribe({
      next: (jobs) => {
        this.recentJobs = jobs;
        this.filteredJobs = jobs;
      },
      error: (error) => console.error('Error al cargar los trabajos recientes', error)
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredJobs = this.recentJobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.companyName.toLowerCase().includes(query)
    );
  }
}