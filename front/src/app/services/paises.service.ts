import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  httpClient = inject(HttpClient);

  listAll() {
    return this.httpClient.get<Pais[]>('/api/paises');
  }
}
