import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { PaisResolver } from './resolvers/PaisResolver';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'add-pais',
        loadComponent:() => 
            import('./features/add-pais/add-pais.component').then(m => m.AddPaisComponent)   
    },
    {
        path: 'edit-pais/:id',
        resolve: { pais: PaisResolver }, // Use the resolver directly
        loadComponent:() => 
            import('./features/edit-pais/edit-pais.component').then(m => m.EditPaisComponent)
      }
];
