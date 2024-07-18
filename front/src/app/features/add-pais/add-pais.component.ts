import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { Pais } from '../../interfaces/pais.interface';
import { ApiService } from '../../services/api.service';

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

  matSnackBar = inject(MatSnackBar);
  valid: boolean = false;
  pais: Pais | null = null;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    const paisString = localStorage.getItem('pais');
    if (paisString) {
      try {
        this.pais = JSON.parse(paisString);
        this.form.patchValue({
          nome: this.pais?.nome ?? '',
          sigla: this.pais?.sigla ?? '',
          gentilico: this.pais?.gentilico ?? ''
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  form = new FormGroup({
    nome: new FormControl<String>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    sigla: new FormControl<String>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('^[A-Za-z]{2}$')],
    }),
    gentilico: new FormControl<String>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  matcher = new MyErrorStateMatcher();

  handleSubmit() {
    this.api.renovarTicket().then(() => {
      if (this.pais) {
        this.handleEdit();
      } else {
        this.handleSave();
      }
    }).catch(() => {
      this.matSnackBar.open('Não foi possivel renovar seu token. Verifique a conexão com o servidor.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    });


  }

  handleEdit() {

    this.api.editarPais({
      id: Number(this.pais?.id) ?? '',
      nome: this.form.value.nome ?? '',
      sigla: this.form.value.sigla ?? '',
      gentilico: this.form.value.gentilico ?? ''
    }).then(response => {
      this.router.navigate(['/home']);
      this.matSnackBar.open('País editado com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }).catch(err => {
      if (err.data.message.includes('Unique index or primary key violation')) {
        this.matSnackBar.open('Não foi possível editar o país! Dados duplicados.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      } else {
        this.matSnackBar.open('Não foi possível editar o país! Verifique sua conexão com o servidor.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/home']);
      }
    })
  }

  handleSave() {
    this.api.salvarPais({
      nome: this.form.value.nome ?? '',
      sigla: this.form.value.sigla ?? '',
      gentilico: this.form.value.gentilico ?? '',
    }
    ).then(response => {
      this.router.navigate(['/home']);

      this.matSnackBar.open('País cadastrado com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }).catch(err => {
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
  }
}
