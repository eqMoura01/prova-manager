import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { AppHeaderComponent } from "../../components/app-header/app-header.component";
import { Pais } from '../../interfaces/pais.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [MatTableModule, RouterLink, AppHeaderComponent, AppHeaderComponent, CommonModule],
  providers: [
    ApiService,
    { provide: 'BASE_URL', useValue: 'http://localhost:8080' }
  ]
})
export class ListComponent implements OnInit {

  isAdministrador: boolean = false;
  matSnackBar = inject(MatSnackBar);
  dataSource: Pais[] = [];
  displayedColumns: string[] = ['Sigla', 'País', 'Gentilico'];
  isValid: boolean = false;



  constructor(
    private router: Router,
    private api: ApiService) {
    this.api = new ApiService('http://localhost:8080/')
  }

  ngOnInit() {
    this.isAdministrador = JSON.parse(localStorage.getItem('user') ?? '').isAdministrador;

    if (this.isAdministrador) {
      this.displayedColumns.push('Acoes');
    }

    this.api.get('pais/listar').then(response => {
      this.dataSource = response
    }).catch(err => {
      console.error(err)
      this.matSnackBar.open('Não foi possivel listar os países! Verifique sua conexao com o servidor.', 'Fechar', {
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
          this.dataSource = this.dataSource.filter(pais => pais.id !== id);

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