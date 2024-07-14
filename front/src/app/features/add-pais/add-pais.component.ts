import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'add-pais',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButtonToggleModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-pais.component.html',
  styleUrls: ['./add-pais.component.scss']
})
export class AddPaisComponent {

  form = new FormGroup({
    nome: new FormControl<String>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    sigla: new FormControl<String>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    gentilico: new FormControl<String>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor(private paisesService: PaisesService, private router: Router) { }

  matSnackBar = inject(MatSnackBar);

  handleSubmit() {
    this.paisesService.save({
      nome: this.form.value.nome ?? '',
      sigla: this.form.value.sigla ?? '',
      gentilico: this.form.value.gentilico ?? '',
    }).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/']);

      this.matSnackBar.open('País cadastrado com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });

    });
  }
}
