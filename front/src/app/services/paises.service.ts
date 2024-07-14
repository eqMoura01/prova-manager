import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../interfaces/pais.interface';
import { PaisPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  constructor(private httpClient: HttpClient) { }

  save(payload: PaisPayload) {
    return this.httpClient.post<Pais>('/api/paises', payload);
  }

  listAll() {
    return this.httpClient.get<Pais[]>('/api/paises');
  }

  findById(id: String) {
    return this.httpClient.get<Pais>(`/api/paises/${id}`);
  }

  update(id: String, payload: PaisPayload) {
    return this.httpClient.put<Pais>(`/api/paises/${id}`, payload);
  }

  deleteById(id: number) {
    return this.httpClient.delete<void>(`/api/paises/${id}`);
  }
}
