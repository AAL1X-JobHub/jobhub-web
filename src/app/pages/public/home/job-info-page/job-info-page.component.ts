import { Component, inject } from '@angular/core';
import { JobDetailsComponent } from '../../../../shared/components/job-details/job-details.component';
import { JobReviewsComponent } from '../../../../shared/components/job-reviews/job-reviews.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-info-page',
  standalone: true,
  imports: [JobDetailsComponent, JobReviewsComponent],
  templateUrl: './job-info-page.component.html',
  styleUrl: './job-info-page.component.css'
})
export class JobInfoPageComponent {
  jobId: number;
  private route=inject(ActivatedRoute);

  constructor() {
    this.jobId = +this.route.snapshot.paramMap.get('id')!;
  }
}