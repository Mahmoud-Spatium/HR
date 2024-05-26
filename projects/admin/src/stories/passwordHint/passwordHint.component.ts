import { NgClass } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-passwordHint',
  templateUrl: './passwordHint.component.html',
  styleUrls: ['./passwordHint.component.scss'],
  standalone: true,
  imports: [NgClass],
})
export class PasswordHintComponent implements OnChanges {

  @Input({ required: true }) passed!: boolean[];
  // count number of passed test for password
  count = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.count = 0;
    changes['passed']['currentValue'].forEach((e: boolean) => {
      e ? ++this.count : this.count;
    });
  }
}
