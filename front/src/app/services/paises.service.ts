import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../interfaces/pais.interface';
import { PaisPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  constructor(private httpClient: HttpClient) { }

  listAll() {
    return this.httpClient.get<Pais[]>('/api/paises');
  }

  save(payload: PaisPayload) {
    return this.httpClient.post<Pais>('/api/paises', payload);
  }
}
