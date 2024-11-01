import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

export const companyRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [],
  },
];