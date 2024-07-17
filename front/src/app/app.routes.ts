import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/add-pais',
    loadComponent: () =>
      import('./features/add-pais/add-pais.component').then(m => m.AddPaisComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-pais/:id',
    loadComponent: () =>
      import('./features/edit-pais/edit-pais.component').then(m => m.EditPaisComponent),
    canActivate: [AuthGuard]
  }
];
