import { Routes } from '@angular/router';

import { DirectoryComponent } from './directory/directory.component';
import { ApplicationsComponent } from './applications/applications.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LayoutComponent } from './layout/layout.component';

import { UpdateProfileComponent } from '../../shared/components/update-profile/update-profile.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';


export const userRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'directory', component: DirectoryComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'profile/update', component: UpdateProfileComponent },
      // Agrega más rutas según tus necesidades
     // { path: '', redirectTo: 'catalog', pathMatch: 'full' } // Redirigir a catalog por defecto
    ],
  },
];