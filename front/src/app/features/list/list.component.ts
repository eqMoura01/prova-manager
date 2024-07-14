import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Pais } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [MatTableModule, RouterLink]
})
export class ListComponent {
  displayedColumns: string[] = ['Sigla', 'País', 'Gentilico'];
  dataSource: Pais[] = [];

  constructor(private paisesService: PaisesService) { }

  ngOnInit() {
    this.paisesService.listAll().subscribe(paises => (
      this.dataSource = paises
    ));
  }

  handleUpdate(id: number) {
    console.log(`Editar Id ${id}`);
  }

  handleDelete(id: number) {
    console.log(`Excluir Id ${id}`);
  }
}