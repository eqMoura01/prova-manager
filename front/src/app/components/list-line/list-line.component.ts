import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'list-line',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './list-line.component.html',
  styleUrl: './list-line.component.scss'
})
export class ListLineComponent {
  @Input() title: string = '';
}
