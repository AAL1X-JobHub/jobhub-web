import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { JobInfoPageComponent } from './home/job-info-page/job-info-page.component';

export const publicContentRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'articles', component: ArticlesComponent },
      {
        path: 'job-details/:id',
        component: JobInfoPageComponent
      },
    ]
  }
];