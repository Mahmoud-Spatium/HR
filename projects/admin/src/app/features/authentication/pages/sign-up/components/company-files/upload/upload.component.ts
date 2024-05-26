import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  input,
} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: true,
})
export class UploadComponent implements OnInit {
  constructor(private host: ElementRef<HTMLElement>) {}

  @Output() cancel = new EventEmitter<boolean | string>();
  parent = input<string>('');
  name = input.required<any>();

  ngOnInit(): void {}

  onDesrtroy() {
    this.host.nativeElement.remove();
  }
}
