import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
})
export class WrapperComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
