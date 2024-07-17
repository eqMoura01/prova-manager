import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit {

  nomeUsuario: string = 'usuario';
  isAdministrador: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isAdministrador = JSON.parse(localStorage.getItem('user') ?? '').isAdministrador;

    this.nomeUsuario = JSON.parse(localStorage.getItem('user') ?? '').nome;
  }

  handleExit() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  
}
