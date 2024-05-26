import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class SignInComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
