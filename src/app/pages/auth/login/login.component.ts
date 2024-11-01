import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthRequest } from '../../../shared/models/auth-request.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatSnackBarModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  private readonly USER_ROLE = 'USER';
  private readonly COMPANY_ROLE = 'COMPANY';
  private readonly USER_ROUTE = '/user/portfolio';
  private readonly COMPANY_ROUTE = '/company/jobs/list';
  private readonly DEFAULT_ROUTE = '/public/home';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit() {
    if(this.loginForm.invalid){
      return;
    };

    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.showSnackBar('Successful login');
        this.redirectUserBasedOnRole();
      },
      error: () => {
        this.showSnackBar('Login failed. Please try again');
      },
    });
  }

  private redirectUserBasedOnRole(): void {
    const userRole = this.authService.getUserRole();

    if (userRole === this.USER_ROLE) {
      this.router.navigate([this.USER_ROUTE]);
    } else if (userRole === this.COMPANY_ROLE) {
      this.router.navigate([this.COMPANY_ROUTE]);
    } else {
      this.router.navigate([this.DEFAULT_ROUTE]);
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}