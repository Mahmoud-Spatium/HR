import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss'],
  standalone: true,
  imports: [LoaderComponent, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifiedComponent implements OnInit, OnDestroy {
  from = signal<string>('');
  subscribe: Subscription;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    // get params from the URL
    this.subscribe = this.actRoute.params.subscribe((params) => {
      this.from.set(params['from']);
    });

    // auto navigate
    setTimeout(() => {
      if (this.from() === 'inOtp') {
        this.router.navigate(['/companies']);
      } else if (this.from() === 'setPassword') {
        this.router.navigate(['/sign-in']);
      }
    }, 3000);
  }

  onNavigate() {
    let paths = {
      upPhone: '/sign-up/company-profile',
      upEmail: '/sign-up/company-files',
      upSuccess: '',
      inOtp: '/companies',
      inPassword: '',
      resetPassword: '/passwordReset/reset',
    };
    this.router.navigate([paths[this.from()]]);
  }

  ngOnDestroy(): void {
    // avoid memory leaks
    this.subscribe.unsubscribe();
  }
}
