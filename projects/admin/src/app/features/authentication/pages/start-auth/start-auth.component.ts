import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-start-auth',
  templateUrl: './start-auth.component.html',
  styleUrls: ['./start-auth.component.scss'],
  standalone: true,
  imports: [RouterLink, TranslateModule],
})
export class StartAuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
