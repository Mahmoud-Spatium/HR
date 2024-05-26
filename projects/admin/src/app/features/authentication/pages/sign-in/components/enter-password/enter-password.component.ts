import { signInService } from './../../../../services/signIn.service';
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
import { PassDirective } from '../../../../directives/pass.directive';
import { NgClass, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CommunicationService } from '../../../../services/commuication.service';
import { LoaderComponent } from '../../../../shared-components/loader/loader.component';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PassDirective,
    NgStyle,
    NgClass,
    RouterLink,
    LoaderComponent,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterPasswordComponent implements OnInit {
  password!: FormGroup;
  displayPassword = false;
  hPass = '';
  router = inject(Router);
  load = signal<boolean>(false);
  private communicationServ = inject(CommunicationService);
  signInService = inject(signInService);

  ngOnInit() {
    this.password = new FormGroup({
      pass: new FormControl('', [Validators.required]),
      hiddenPass: new FormControl('', [Validators.required]),
    });
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
    this.hPass = hidden.value;
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
      this.password.get('pass')?.setValue('•'.repeat(this.hPass.length));
    }
  }

  // company login
  onLogin() {
    this.load.set(true);
    this.signInService
      .loginCompany(this.communicationServ.selectedCompanyId(), this.hPass)
      .pipe(
        finalize(() => {
          this.load.set(false);
        }),
      )
      .subscribe(
        (res) => {
          // navigate based on company status
          if (res.result.accountStatusId === 1) {
            localStorage.setItem('token', res.result.token.accessToken);
            this.router.navigateByUrl('/sign-up/company-profile');
          } else if (res.result.accountStatusId === 3) {
            localStorage.setItem('token', res.result.token.accessToken);
            this.router.navigateByUrl('/sign-up/company-files');
          } else if (res.result.accountStatusId === 4) {
            this.router.navigateByUrl('/verified/upAttach');
          }
          // when status is 5
          // this.router.navigate(['verified/inPassword']);
        },
        (err) => {
          if (err.status === 401) {
            this.password.reset({
              pass: '',
            });
          } else if (err.status === 456) {
            this.communicationServ.blockingDate.set(err.error.result);
            this.router.navigateByUrl('/counter');
          } else if (err.status === 458) {
            this.router.navigateByUrl('/blocked');
          }
        },
      );
  }

  // navigate to password reset
  onNavigate() {
    this.communicationServ.backWord.set('/sign-in/enter-password');
    this.router.navigate(['/passwordReset/email']);
  }
}
