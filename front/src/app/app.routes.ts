import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { AddPaisComponent } from './features/add-pais/add-pais.component';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'add-pais',
        loadComponent:() => 
            import('./features/add-pais/add-pais.component').then(m => m.AddPaisComponent)   
    }
];
