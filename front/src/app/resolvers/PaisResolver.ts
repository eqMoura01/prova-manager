import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { PaisesService } from '../services/paises.service';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisResolver implements Resolve<Pais | null> {
  constructor(private paisesService: PaisesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Pais | null> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.paisesService.findById(id).toPromise()
        .then(result => result || null);
    } else {
      return Promise.resolve(null); 
    }
  }
}
