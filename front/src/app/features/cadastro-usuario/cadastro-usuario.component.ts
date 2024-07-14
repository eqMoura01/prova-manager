import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cadastro-usuario',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButtonToggleModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent {
  form = new FormGroup({
    nome: new FormControl<String>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    usuario: new FormControl<String>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    senha: new FormControl<String>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
  });

  handleRegister(){
    console.log(this.form.value);
  }
}
