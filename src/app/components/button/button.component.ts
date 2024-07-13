import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() color: string = ''; 

  handleClick = () => {

    if (this.title === 'Editar') {
      console.log('Editar');      
    } else if (this.title === 'Excluir') {
      console.log('Excluir');      
    }

  }
}
