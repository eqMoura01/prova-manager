import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { ApiService } from '../../services/api.service';
import { PaisesService } from '../../services/paises.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'add-pais',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButtonToggleModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, AppHeaderComponent],
  templateUrl: './add-pais.component.html',
  styleUrls: ['./add-pais.component.scss'],
  providers: [
    ApiService,
    { provide: 'BASE_URL', useValue: 'http://localhost:8080' }
  ]
})
export class AddPaisComponent {

  form = new FormGroup({
    nome: new FormControl<String>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    sigla: new FormControl<String>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
    }),
    gentilico: new FormControl<String>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  matcher = new MyErrorStateMatcher();

  constructor(private paisesService: PaisesService, private router: Router, private api: ApiService) { }

  matSnackBar = inject(MatSnackBar);
  valid: boolean = false;

  handleSubmit() {
    this.api.renovarTicket()
      .then(response => {
        this.valid = response;

        this.api.post('pais/salvar', {
          nome: this.form.value.nome ?? '',
          sigla: this.form.value.sigla ?? '',
          gentilico: this.form.value.gentilico ?? '',
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }).then(response => {
          this.form.reset();
          this.router.navigate(['/home']);

          this.matSnackBar.open('País cadastrado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }).catch(err => {
          console.error(err.data.message.includes('Unique index or primary key violation'));
          if (err.data.message.includes('Unique index or primary key violation')) {
            this.matSnackBar.open('Não foi possível cadastrar o país! Dados duplicados.', 'Fechar', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          } else {
            this.matSnackBar.open('Não foi possível cadastrar o país! Verifique sua conexão com o servidor.', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.router.navigate(['/home']);
          }
        });

      })
      .catch(err => {
        this.valid = false;
        console.error(err);
        this.matSnackBar.open('Sua sessão expirou! Faça login novamente.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['/']);
      });
  }
}
