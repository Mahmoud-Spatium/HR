import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-passwordHint',
  templateUrl: './passwordHint.component.html',
  styleUrls: ['./passwordHint.component.scss'],
  standalone: true,
  imports: [NgClass, TranslateModule],
})
export class PasswordHintComponent {
  @Input({ required: true }) passed!: (boolean | number)[];
}
