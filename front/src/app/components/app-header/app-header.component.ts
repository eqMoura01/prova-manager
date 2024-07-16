import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  ngOnInit() {
    this.isAdministrador = JSON.parse(localStorage.getItem('user') ?? '').isAdministrador;

    console.log('isAdministrador', this.isAdministrador);

    this.nomeUsuario = JSON.parse(localStorage.getItem('user') ?? '').nome;
  }
  
}
