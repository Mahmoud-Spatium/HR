import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  input,
} from '@angular/core';

@Component({
  selector: 'app-loaded',
  templateUrl: './loaded.component.html',
  styleUrls: ['./loaded.component.scss'],
  standalone: true,
  imports: [DatePipe],
})
export class LoadedComponent {
  file = input.required<any>();
  parent = input<string>();
  @Output() cancel = new EventEmitter<boolean | string>();

  constructor(private host: ElementRef<HTMLElement>) {}

  date() {
    return new Date();
  }

  openFile() {
    window.open(URL.createObjectURL(this.file()), '_blank');
  }

  onDesrtroy() {
    this.host.nativeElement.remove();
  }
}
