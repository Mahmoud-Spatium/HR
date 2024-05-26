import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-Dynamic-button',
  templateUrl: './Dynamic-button.component.html',
  styleUrls: ['./Dynamic-button.component.scss'],
  imports: [NgStyle, RouterLink],
  standalone: true,
})
export class DynamicButtonComponent implements OnInit {
@Input({ required: true }) data!: {
    bg: string;
    content: string;
    router: string;
  };
  constructor() {}

  ngOnInit() {}

}
