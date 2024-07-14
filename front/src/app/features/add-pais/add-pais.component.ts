import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

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

  handleSubmit() {
    console.log(this.form.value);
  }
}
