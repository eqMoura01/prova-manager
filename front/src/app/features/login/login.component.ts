import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButtonToggleModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    ApiService,
    { provide: 'BASE_URL', useValue: 'http://localhost:8080' }
  ]
})
export class LoginComponent {

  constructor(private router: Router, private api: ApiService) {
    this.api = new ApiService('http://localhost:8080')
  }

  matSnackBar = inject(MatSnackBar);

  form = new FormGroup({
    login: new FormControl<String>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    senha: new FormControl<String>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  handleLogin() {
    this.api.post('usuario/autenticar', {
      login: this.form.value.login,
      senha: this.form.value.senha
    })
      .then(response => {
        localStorage.setItem('jwt', response.token)
        localStorage.setItem('user', JSON.stringify(response))
        this.router.navigate(['/home'])
      })
      .catch(err => {
        this.matSnackBar.open('Usuario ou senha invalida!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error(err)
      })
  }

}