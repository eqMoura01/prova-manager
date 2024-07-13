import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ListLineComponent } from '../../components/list-line/list-line.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListLineComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  paises: any[] = [];

  httpClient = inject(HttpClient);

  ngOnInit() {
    this.httpClient.get<any>('/api/paises').subscribe((paises) => {
      this.paises = paises;
    });
  }
}
