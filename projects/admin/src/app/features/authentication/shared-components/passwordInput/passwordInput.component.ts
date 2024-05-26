import { passwordResetService } from './../../services/passwordReset.service';
import { signUpService } from './../../services/signUp.service';
import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, inject, input, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { PasswordHintComponent } from '../passwordHint/passwordHint.component';
import { PassDirective } from '../../directives/pass.directive';
import { Router } from '@angular/router';
import { CommunicationService } from '../../services/commuication.service';
import { registerCompanyRequest } from '../../models/signUp.models';
import { LoaderComponent } from '../loader/loader.component';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-passwordInput',
  templateUrl: './passwordInput.component.html',
  styleUrls: ['./passwordInput.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    PasswordHintComponent,
    PassDirective,
    LoaderComponent,
    TranslateModule,
  ],
})
export class PasswordInputComponent {
  // for company profile
  @Input() parentData: { valid: boolean; email: string; name: string } = {
    valid: true,
    name: '',
    email: '',
  };
  // the parent of the component
  parent = input();
  // control over password input
  match: boolean = true;
  // password pass 4 validity conditions
  validity: boolean = true;
  passedHints: (boolean | number)[] = [];
  count: number = 0;
  displayPassword = false;
  displayConfirm = false;
  displayHints = false;
  hPass: string = '';
  hConf: string = '';

  // form group for password
  passwordFormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.maxLength(40),
      Validators.minLength(8),
      Validators.required,
    ]),
    passwordHide: new FormControl('', [
      Validators.maxLength(40),
      Validators.minLength(8),
      Validators.required,
    ]),
    confirm: new FormControl('', [
      Validators.maxLength(40),
      Validators.minLength(8),
      Validators.required,
    ]),
    confirmHide: new FormControl('', [
      Validators.maxLength(40),
      Validators.minLength(8),
      Validators.required,
    ]),
  });

  // inject services
  communicateServ = inject(CommunicationService);
  router = inject(Router);
  signUpService = inject(signUpService);
  passwordResetService = inject(passwordResetService);

  // load
  load = signal<boolean>(false);

  // validator function
  validPassword(pass: any) {
    this.passedHints = [];
    // password passed tests
    this.passedHints.push(pass.length >= 8);
    this.passedHints.push(/[0-9]/.test(pass));
    this.passedHints.push(/[a-z]/.test(pass) && /[A-Z]/.test(pass));
    this.passedHints.push(
      /[ `!@#$%^&*()_+\-=\[\]{}; ':"\\|,.<>\/?~]/.test(pass),
    );

    // count passed to define password strength
    this.count = this.passedHints.filter((e) => e).length;

    // check if all passed tests (the validity)
    this.passedHints.includes(false) === false
      ? (this.validity = true)
      : (this.validity = false);
  }

  // display last character for 3 seconds
  onEnterPassword(e: Event) {
    let showLength = 1,
      delay = 3000,
      hideAll = setTimeout(function () {}, 0);
    const password = e.target as HTMLInputElement,
      hidden = (e.target as HTMLInputElement)
        .nextElementSibling as HTMLInputElement;

    let offset = password.value.length - hidden.value.length;
    if (offset > 0) {
      hidden.value =
        hidden.value +
        password.value.substring(
          hidden.value.length,
          hidden.value.length + offset,
        );
    } else if (offset < 0) {
      hidden.value = hidden.value.substring(0, hidden.value.length + offset);
    }
    if (password.value.length > showLength) {
      password.value =
        password.value
          .substring(0, password.value.length - showLength)
          .replace(/./g, '•') +
        password.value.substring(
          password.value.length - showLength,
          password.value.length,
        );
    }
    if (password.classList.contains('pass')) {
      this.hPass = hidden.value;
    } else {
      this.hConf = hidden.value;
    }
    // match or not
    if (this.hPass === this.hConf) {
      this.match = true;
    } else {
      this.match = false;
    }
    // call function to check password validity
    this.validPassword(this.hPass);
    // Set the timer
    clearTimeout(hideAll);
    hideAll = setTimeout(function () {
      password.value = password.value.replace(/./g, '•');
    }, delay);
  }

  // Store Values When Password Displayed
  onDisplayedPassword(e: Event) {
    // take the value of the Displayed Password
    if ((e.target as HTMLInputElement).classList.contains('hPass')) {
      this.hPass = (e.target as HTMLInputElement).value;
      // Make number of dots equal to the length of the displayed password
      this.passwordFormGroup
        .get('password')
        ?.setValue('•'.repeat(this.hPass.length));
    } else {
      this.hConf = (e.target as HTMLInputElement).value;
      // Make number of dots equal to the length of the displayed Confirmation
      this.passwordFormGroup
        .get('confirm')
        ?.setValue('•'.repeat(this.hConf.length));
    }
    // Compare two values to define match or not
    if (this.hPass === this.hConf) {
      // match or not
      this.match = true;
    } else {
      this.match = false;
    }
    // call function to check password validity
    this.validPassword(this.hPass);
  }

  onNavigate() {
    this.load.set(true);
    if (this.parent() === 'reset') {
      this.passwordResetService
        .resetPassword(this.hPass)
        .pipe(finalize(() => this.load.set(false)))
        .subscribe(
          (res) => {
            this.router.navigate([`/verified/setPassword`]);
          },
          (err) => {
            if (err.status === 409) {
              this.passwordFormGroup.reset({
                password: '',
                passwordHide: '',
                confirm: '',
                confirmHide: '',
              });
            }
          },
        );
    } else {
      const companyData: registerCompanyRequest = {
        companyName: this.parentData.name,
        email: this.parentData.email,
        password: this.hPass,
      };
      this.load.set(true);
      this.signUpService
        .createCompany(companyData)
        .pipe(finalize(() => this.load.set(false)))
        .subscribe((res) => {
          this.communicateServ.backWord.set('/sign-up/company-profile');
          this.communicateServ.forward.set('/verified/upEmail');
          this.communicateServ.email.set(this.parentData.email);
          // store data in LS
          localStorage.setItem(
            'data',
            JSON.stringify({
              backWord: '/sign-up/company-profile',
              forward: '/verified/upEmail',
              email: this.parentData.email,
            }),
          );
          this.router.navigate(['/otpVerification']);
        });
    }
  }
}
