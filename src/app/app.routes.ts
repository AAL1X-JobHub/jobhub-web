import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';

export const routes: Routes = [
    {path:'', redirectTo:'auth', pathMatch:'full'},
    {   path: 'user',
        loadChildren: () => import('./pages/user/user.routes').then(u => u.userRoutes),
        canActivate: [authGuard]
    },
    {   path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes),
        canActivate: [authInverseGuard],
    },
    {   path: 'company',
        loadChildren: () => import('./pages/company/company.routes').then(c => c.companyRoutes),
        canActivate: [authGuard]
    },
    {   path:'home',
        loadChildren: () => import('./pages/public/public-content.routes').then(a => a.publicContentRoutes)
    }
    /*
    {
        path:'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes), canActivate: [authInverseGuard],
    },
    {
        path: 'user',
        loadChildren: () => import('./pages/user/user.routes').then(u => u.userRoutes), canActivate: [authGuard]
    },
    {
        path: 'company',
        loadChildren: () => import('./pages/company/company.routes').then(c => c.companyRoutes), canActivate: [authGuard]
    }
    */
];