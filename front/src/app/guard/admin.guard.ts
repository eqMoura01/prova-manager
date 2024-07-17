import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  matSnackBar = inject(MatSnackBar);

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.isAdministrador) {
      return true;
    } else {
      this.matSnackBar.open('Acesso a essa URL foi negado. Você não é um Administrador.', 'OK', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.router.navigate(['/home']);
      return false;
    }
  }
}
