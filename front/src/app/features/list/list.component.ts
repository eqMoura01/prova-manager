import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { AppHeaderComponent } from "../../components/app-header/app-header.component";
import { Pais } from '../../interfaces/pais.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [MatTableModule, RouterLink, AppHeaderComponent, AppHeaderComponent, CommonModule,
    MatPaginatorModule
  ],
})
export class ListComponent {

  isAdministrador: boolean = false;
  matSnackBar = inject(MatSnackBar);


  dataSource = new MatTableDataSource<Pais>([]);
  displayedColumns: string[] = ['Sigla', 'País', 'Gentilico'];
  isValid: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(
    private router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.cdr.detectChanges();
  }

  loadData() {
    this.isAdministrador = JSON.parse(localStorage.getItem('user') ?? '').isAdministrador;

    if (this.isAdministrador) {
      this.displayedColumns.push('Acoes');
    }

    this.api.get('pais/listar').then(response => {
      this.dataSource.data = response;
    }).catch(err => {
      console.error(err);
      this.matSnackBar.open('Não foi possível listar os países! Verifique sua conexão com o servidor.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    });
  }

  handleUpdate(pais: Pais) {
    this.router.navigate([`/edit-pais`, pais.id]);
    localStorage.setItem('pais', JSON.stringify(pais));
  }

  handleDelete(id: number) {
    this.api.renovarTicket()
      .then((response) => {
        this.isValid = response;
        console.log(this.isValid)


        this.api.delete(`pais/deletar/${id}`).then(() => {
          this.dataSource.data = this.dataSource.data.filter(pais => pais.id !== id);

          this.matSnackBar.open('País excluído com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }).catch(err => {
          console.error(err)
          this.matSnackBar.open('Não foi possivel excluir o país! Verifique sua conexao com o servidor.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        });
      })
      .catch(err => {
        console.error(err)
        this.matSnackBar.open('Não foi possivel renovar o ticket! Verifique sua conexao com o servidor.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['/']);
      });
  }
}