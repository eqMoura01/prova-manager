import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit {

  nomeUsuario: string = 'usuario';

  ngOnInit() {
    this.nomeUsuario = JSON.parse(localStorage.getItem('user') ?? '').nome;
  }
  
}
