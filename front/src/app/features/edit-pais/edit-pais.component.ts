import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pais } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'app-edit-pais',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButtonToggleModule, RouterLink, AppHeaderComponent],
  templateUrl: './edit-pais.component.html',
  styleUrls: ['./edit-pais.component.scss']
})
export class EditPaisComponent {
  form: FormGroup;

  constructor(
    private paisesService: PaisesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const pais: Pais = this.route.snapshot.data['pais'];
    this.form = new FormGroup({
      nome: new FormControl<String>(pais.nome, {
        nonNullable: true,
        validators: Validators.required,
      }),
      sigla: new FormControl<String>(pais.sigla, {
        nonNullable: true,
        validators: Validators.required,
      }),
      gentilico: new FormControl<String>(pais.gentilico, {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }
  
  matSnackBar = inject(MatSnackBar);

  handleSubmit() {
    const pais: Pais = this.route.snapshot.data['pais'];

    if (pais) {
      this.paisesService.update(pais.id, {
        nome: this.form.value.nome ?? '',
        sigla: this.form.value.sigla ?? '',
        gentilico: this.form.value.gentilico ?? '',
      }).subscribe(() => {
        this.form.reset();
        this.router.navigate(['/home']);

        this.matSnackBar.open('País editado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      });
    } else {
      console.error('Error: Pais data not found in route resolver');
    }
  }
}
