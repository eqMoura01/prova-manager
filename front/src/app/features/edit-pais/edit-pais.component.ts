import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { Pais } from '../../interfaces/pais.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-pais',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButtonToggleModule, RouterLink, AppHeaderComponent],
  templateUrl: './edit-pais.component.html',
  styleUrls: ['./edit-pais.component.scss'],
  providers: [
    ApiService,
    { provide: 'BASE_URL', useValue: 'http://localhost:8080' }
  ]
})
export class EditPaisComponent {
  form: FormGroup;

  pais: Pais = JSON.parse(localStorage.getItem('pais') ?? '');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    const pais: Pais = JSON.parse(localStorage.getItem('pais') ?? '');
    this.form = new FormGroup({
      nome: new FormControl<String>(pais.nome, {
        nonNullable: true,
        validators: Validators.required,
      }),
      sigla: new FormControl<String>(pais.sigla, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('^[A-Za-z]{2}$')],
      }),
      gentilico: new FormControl<String>(pais.gentilico, {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }

  matSnackBar = inject(MatSnackBar);

  handleSubmit() {
    this.pais = {
      id: this.pais.id,
      nome: this.form.get('nome')?.value,
      sigla: this.form.get('sigla')?.value,
      gentilico: this.form.get('gentilico')?.value
    }
    this.api.renovarTicket()
      .then(response => {
        this.api.put('pais/atualizar', this.pais)
          .then(response => {
            this.matSnackBar.open('País atualizado com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.router.navigate(['/home']);
          })
          .catch(err => {
            console.error(err);
            this.matSnackBar.open('Não foi possível atualizar o país! Verifique sua conexão com o servidor.', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          });
      })
      .catch(err => {
        console.error(err);
        this.matSnackBar.open('Não foi possivel renovar o ticket! Verifique sua conexao com o servidor.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['/']);
      })
  }
}
