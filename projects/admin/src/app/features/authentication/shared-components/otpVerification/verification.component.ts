import { passwordResetService } from './../../services/passwordReset.service';
import { signInService } from './../../services/signIn.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { otpDirecrive } from '../../directives/otp.directive';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { CommunicationService } from '../../services/commuication.service';
import { TranslateModule } from '@ngx-translate/core';
import { signUpService } from '../../services/signUp.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  standalone: true,
  imports: [
    otpDirecrive,
    ReactiveFormsModule,
    NgClass,
    LoaderComponent,
    RouterLink,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationComponent implements OnInit {
  otpForm!: FormGroup;
  loading = signal<boolean>(false);
  back!: string;
  forward!: string;
  verified!: string;
  way!: string;
  disableResend = signal<boolean>(true);
  // start dependency injection
  communicationServ = inject(CommunicationService);
  router = inject(Router);
  signUpService = inject(signUpService);
  signInService = inject(signInService);
  passwordResetService = inject(passwordResetService);

  ngOnInit() {
    this.verified =
      this.communicationServ.email() || this.communicationServ.phone();
    this.way = this.verified.includes('@')
      ? 'email'
      : /[0-9]/g.test(this.verified)
        ? 'phone'
        : 'auth';

    this.back = this.communicationServ.backWord();
    this.forward = this.communicationServ.forward();

    // define otp form
    this.otpForm = new FormGroup({
      code1: new FormControl('', Validators.required),
      code2: new FormControl('', Validators.required),
      code3: new FormControl('', Validators.required),
      code4: new FormControl('', Validators.required),
      code5: new FormControl('', Validators.required),
      code6: new FormControl('', Validators.required),
    });

    // disable resend button
    setTimeout(() => {
      this.disableResend.set(false);
    }, 60000);
  }

  onSubmit() {
    // get otp value from form
    let otpValue = '';
    for (const key in this.otpForm.value) {
      // to prevent from go at the prototype chain searching on that
      if (this.otpForm.value.hasOwnProperty(key)) {
        otpValue += this.otpForm.value[key];
      }
    }

    this.loading.set(true);
    if (this.back === '/sign-up/company-profile') {
      this.emailValidate(otpValue);
    } else if (this.back === '/sign-up') {
      this.phoneValidate(otpValue);
    } else if (this.back === '/sign-in/identity') {
      this.userLoginValidate(otpValue);
    } else if (this.back === '/passwordReset/email') {
      this.passWordResetValidate(otpValue);
    }
  }

  onResend() {
    if (this.back === '/sign-up/company-profile') {
      this.resendEmailOtp();
    } else if (this.back === '/sign-up') {
      this.resendPhoneOtp();
    } else if (this.back === '/sign-in/identity') {
      this.resendUserLoginOtp();
    } else if (this.back === '/passwordReset/email') {
      this.resendPasswordResetOtp();
    }
  }

  emailValidate(otpValue: string) {
    this.signUpService
      .emailOtpVerification({
        email: this.verified,
        otp: otpValue,
      })
      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.result.token.accessToken);
          this.router.navigate([this.forward]);
        },
        (err) => {
          if (err.status === 469) {
            this.router.navigate(['/timeOut']);
          }
          this.otpForm.reset();
        },
      );
  }
  resendEmailOtp() {
    this.signUpService.resendEmailOtp(this.verified).subscribe((res) => {
      this.otpForm.reset();
      // disable resend button
      this.disableResend.set(true);
      setTimeout(() => {
        this.disableResend.set(false);
      }, 60000);
    });
  }
  phoneValidate(otpValue: string) {
    this.signUpService
      .phoneOtpVerification({
        otp: otpValue,
        phoneNumber: '+' + this.verified.replace('.', ''),
      })
      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.result.token.accessToken);
          this.router.navigate([this.forward]);
        },
        (err) => {
          if (err.status === 468) {
            this.router.navigate(['/timeOut']);
          }
          this.otpForm.reset();
        },
      );
  }
  resendPhoneOtp() {
    this.signUpService
      .resendPhoneOtp('+' + this.verified.replace('.', ''))
      .subscribe((res) => {
        console.log(res);
        this.otpForm.reset();
        // disable resend button
        this.disableResend.set(true);
        setTimeout(() => {
          this.disableResend.set(false);
        }, 60000);
      });
  }
  userLoginValidate(otpValue: string) {
    this.loading.set(true);
    this.signInService
      .validateLogin(this.verified, otpValue)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.result.token.accessToken);
          // navigate to next page based on account status
          if (res.result.statusID === 1) {
            this.router.navigateByUrl('/sign-up/company-profile');
          } else {
            this.communicationServ.userCompany.set(res.result.userCompanies);
            this.communicationServ.phone.set(res.result.phoneNumber);
            this.router.navigate([this.forward]);
          }
        },
        (err) => {
          this.otpForm.reset();
        },
      );
  }
  resendUserLoginOtp() {
    this.signInService.resendUserLoginOtp(this.verified).subscribe((res) => {
      this.otpForm.reset();
      // disable resend button
      this.disableResend.set(true);
      setTimeout(() => {
        this.disableResend.set(false);
      }, 60000);
    });
  }
  passWordResetValidate(otp) {
    this.loading.set(true);
    this.passwordResetService
      .confirmEmailOtp(this.verified, otp)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.result.token.accessToken);
          this.router.navigate([this.forward]);
        },
        (err) => {
          this.otpForm.reset();
        },
      );
  }
  resendPasswordResetOtp() {
    this.passwordResetService.resendEmailOtp(this.verified).subscribe((res) => {
      this.otpForm.reset();
      // disable resend button
      this.disableResend.set(true);
      setTimeout(() => {
        this.disableResend.set(false);
      }, 60000);
    });
  }
}
