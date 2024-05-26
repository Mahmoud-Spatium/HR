import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommunicationService } from '../../../../services/commuication.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgClass, TranslateModule],
})
export class CounterComponent implements OnInit {
  currentTime!: Date;
  blockedTime!: Date;
  disabled: boolean = true;
  interval: any;
  date: {
    hour: number;
    minutes: number;
    second: number;
  } = {
    hour: 0,
    minutes: 0,
    second: 0,
  };
  // dependency injection
  CommunicationService = inject(CommunicationService);

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) {}
  ngOnInit() {
    this.createCounter();
    this.interval = setInterval(() => {
      this.createCounter();
    }, 1000);
  }

  createCounter() {
    this.currentTime = new Date();
    this.blockedTime = new Date(this.CommunicationService.blockingDate());
    const diff_time = this.blockedTime.getTime() - this.currentTime.getTime();
    if (diff_time > 0) {
      this.date.hour = Math.floor(
        (diff_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      this.date.minutes = Math.floor(
        (diff_time % (1000 * 60 * 60)) / (1000 * 60),
      );
      this.date.second = Math.floor((diff_time % (1000 * 60)) / 1000);
    }
    // check if time is over or not and enable the button
    if (this.date.hour > 0 || this.date.minutes > 0 || this.date.second > 0) {
      this.disabled = true;
    } else {
      this.disabled = false;
      clearInterval(this.interval);
    }
    this.cdRef.markForCheck();
  }

  // navigate to sign-in
  navigate() {
    this.router.navigate(['/sign-in/enterPassword']);
  }
}
