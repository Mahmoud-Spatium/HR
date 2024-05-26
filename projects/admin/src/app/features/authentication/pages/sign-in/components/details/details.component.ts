import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommunicationService } from '../../../../services/commuication.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { signInService } from '../../../../services/signIn.service';
import { availableAuthWay } from '../../../../models/signIn.models';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../../../shared-components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    RecaptchaModule,
    LoaderComponent,
    TranslateModule,
  ],
})
export class DetailsComponent implements OnInit {
  details!: FormGroup;
  captcha!: string;
  load!: boolean;
  private communicateServ = inject(CommunicationService);
  signInService = inject(signInService);

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.captcha = '';
    this.load = false;
    this.details = new FormGroup({
      config: new FormControl('', [Validators.required]),
    });
  }

  // Get the Phone Number From Phone Number Input and Pass to identity
  OnNext() {
    this.load = true;
    this.signInService
      .availableWay(this.details.value.config, this.captcha)
      .pipe(
        finalize(() => {
          this.load = false;
        }),
      )
      .subscribe(
        (res: availableAuthWay) => {
          res.result.authenticationsTypes.forEach((e) => {
            if (e.enumString == 'phoneNumber') {
              this.communicateServ.availableAuthWay.set({
                phone: true,
                authApp: false,
              });
            }
          });
          this.communicateServ.email.set('');
          this.communicateServ.phone.set('' + this.details.value.config);
          this.router.navigate([`/sign-in/identity`]);
        },
        (err) => {
          // reset the form , recaptcha and loader
          this.details.reset({
            config: '',
          });
          this.details.get('config').markAsUntouched();
          grecaptcha.reset();
          this.captcha = '';
          this.load = false;
        },
      );
  }

  // captcha response
  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }
}
