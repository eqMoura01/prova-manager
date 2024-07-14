import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  constructor(private httpClient: HttpClient) {}

  listAll() {
    return this.httpClient.get<Pais[]>('/api/paises');
  }
}
