import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { LoginComponent } from './features/login/login.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    loadComponent() {
      return import('./features/list/list.component').then(m => m.ListComponent);
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'home/add-pais',
    loadComponent: () =>
      import('./features/add-pais/add-pais.component').then(m => m.AddPaisComponent),
    canActivate: [AuthGuard, AdminGuard]
  }
];
