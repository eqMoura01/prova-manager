import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [MatTableModule]
})
export class ListComponent {
  displayedColumns: string[] = ['Sigla', 'País',  'Gentilico'];
  dataSource: Pais[] = [];

  constructor(private paisesService: PaisesService) { }

  ngOnInit() {
    this.paisesService.listAll().subscribe(paises => (this.dataSource = paises));
  }
}