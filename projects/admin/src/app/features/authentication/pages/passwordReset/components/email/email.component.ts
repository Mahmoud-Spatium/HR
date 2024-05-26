import { passwordResetService } from './../../../../services/passwordReset.service';
import { CommunicationService } from './../../../../services/commuication.service';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { LoaderComponent } from '../../../../shared-components/loader/loader.component';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    RecaptchaModule,
    LoaderComponent,
    TranslateModule,
  ],
})
export class EmailComponent implements OnInit {
  emailForm: FormGroup;
  captcha!: string;
  load = signal<boolean>(false);
  // start dependency injection
  private CommunicationServ = inject(CommunicationService);
  private router = inject(Router);
  private passwordResetService = inject(passwordResetService);

  constructor() {}

  ngOnInit() {
    this.captcha = '';
    this.emailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
      ]),
    });
  }

  onSubmit() {
    this.load.set(true);
    this.passwordResetService
      .sendEmailOtp(this.emailForm.value.email, this.captcha)
      .pipe(finalize(() => this.load.set(false)))
      .subscribe(
        (res) => {
          this.CommunicationServ.email.set(this.emailForm.value.email);
          this.CommunicationServ.backWord.set('/passwordReset/email');
          this.CommunicationServ.forward.set('/verified/resetPassword');
          this.router.navigate([`otpVerification`]);
        },
        (err) => {
          // reset the form , recaptcha and loader
          this.emailForm.reset({
            email: '',
          });
          this.emailForm.get('email').markAsUntouched();
          grecaptcha.reset();
          this.captcha = '';
          this.load.set(false);
        },
      );
  }

  // captcha response
  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }
}
