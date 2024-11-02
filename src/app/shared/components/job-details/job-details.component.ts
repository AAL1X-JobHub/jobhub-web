import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { JobDetailsResponse } from '../../models/job-details-response.model';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { JobService } from '../../../core/services/job.service';
import { HomeService } from '../../../core/services/home.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { PurchaseItemCreateUpdateRequest } from '../../models/purchase-create-update-request.models';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSnackBarModule, ApiImgPipe],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job!: JobDetailsResponse;
  @Input() jobId!: number;

  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);
  private homeService = inject(HomeService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  private cartService = inject(CartService);

  isAuthenticated = false;
  isUser: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isUser = this.authService.getUserRole() === 'USER';

    if (this.jobId) {
      this.loadJobDetails(this.jobId);
    }
  }

  loadJobDetails(jobId: number): void {
    this.homeService.getJobDetailsById(jobId).subscribe({
      next: (data) => (this.job = data),
      error: () => this.showSnackBar('Error al cargar detalles del libro'),
    });
  }

  goBackToHome(): void {
    const routePath = this.isUser ? '/user/portfolio' : '/home';
    this.router.navigate([routePath]);
  }

  addToCart(): void {
    if (!this.isUser) {
      this.showSnackBar(
        'Debe iniciar sesión como cliente para agregar al carrito'
      );
      return;
    }

    const cartItem: PurchaseItemCreateUpdateRequest = {
      companyName: this.job.companyName,
      jobName: this.job.title,
      quantity: 1,
      price: this.job.salaryRange,
    };

    this.cartService.addToCart(cartItem);
    console.log('Libro agregado al carrito:', cartItem);
    this.showSnackBar('Libro agregado al carrito');
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}