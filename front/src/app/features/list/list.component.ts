import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  matSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.paisesService.listAll().subscribe(paises => (
      this.dataSource = paises
    ));
  }

  handleUpdate(id: number) {
    console.log(`Editar Id ${id}`);
  }

  handleDelete(id: number) {
    this.paisesService.deleteById(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(pais => pais.id !== id);

      this.matSnackBar.open('País excluído com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    });
  }
}