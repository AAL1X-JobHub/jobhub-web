import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { JobDetailsResponse } from '../../models/job-details-response.model';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [MatCardModule, ApiImgPipe],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent {
  @Input() job!: JobDetailsResponse;
  isUser: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.isUser = this.authService.getUserRole() === 'USER';
  }

  viewDetails() {
    const routePath = this.isUser
      ? '/user/catalog/details'
      : '/home/job-details';
    this.router.navigate([routePath, this.job.companyName]);
  }
}