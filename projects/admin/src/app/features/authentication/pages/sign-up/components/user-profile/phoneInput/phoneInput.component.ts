import { Component, Input, OnInit, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgClass } from '@angular/common';
import { CountryListComponent } from './countryList/countryList.component';

import { RecaptchaModule } from 'ng-recaptcha';
import { openList } from '../../../../../directives/openList.directive';
import { countryCode } from '../../../../../models/countryCode.interface';
import { signUpService } from '../../../../../services/signUp.service';
import { CommunicationService } from '../../../../../services/commuication.service';
import { Router } from '@angular/router';
import { registerUserRequest } from '../../../../../models/signUp.models';
import { LoaderComponent } from '../../../../../shared-components/loader/loader.component';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-phoneInput',
  templateUrl: './phoneInput.component.html',
  styleUrls: ['./phoneInput.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    CountryListComponent,
    openList,
    RecaptchaModule,
    LoaderComponent,
    TranslateModule,
  ],
})
export class PhoneInputComponent implements OnInit {
  // parent
  @Input() parentData: { name: string; valid: boolean } = {
    name: '',
    valid: false,
  };
  // all countries list to pass this list to the country list component
  countries: countryCode[] = [];
  // forms
  phoneFormGroup!: FormGroup;
  // initial selected country at phone step
  selectedCounty!: countryCode;
  // captcha
  captcha!: string;
  // phone Number to set the value of the input on it
  number: string = '';
  // loading state
  loading = signal(false);

  // Inject Dependencies
  signUpService = inject(signUpService);
  communicateService = inject(CommunicationService);
  router = inject(Router);

  constructor() {
    // fetching the countries list from json
    fetch('../../../../../assets/images/flags/countries-data.json')
      .then((res) => res.json())
      .then((res) => {
        this.countries = res;
      });

    this.captcha = '';
  }

  ngOnInit(): void {
    // form group for phone
    this.phoneFormGroup = new FormGroup({
      phone: new FormControl(null, [Validators.required]),
    });

    // initial selected country at phone step
    this.selectedCounty = {
      image:
        '../../../../../assets/images/flags/Country=EG - Egypt, Size=L.svg',
      name: 'Egypt',
      code: '20',
      length: 10,
      arName: 'مصر',
    };
  }

  // on enter phone number
  onEnterPhone(e: Event) {
    // set the input value in the number variable
    this.number = (e.target as HTMLInputElement).value;
    // stop write after the selected length
    if (
      (e.target as HTMLInputElement).value.length < this.selectedCounty.length
    ) {
      (e.target as HTMLInputElement).type = 'number';
    } else if (
      (e.target as HTMLInputElement).value.length === this.selectedCounty.length
    ) {
      (e.target as HTMLInputElement).type = 'string';
      (e.target as HTMLInputElement).maxLength = this.selectedCounty.length;
      // set the cursor at the end
      (e.target as HTMLInputElement).setSelectionRange(
        (e.target as HTMLInputElement).value.length,
        (e.target as HTMLInputElement).value.length,
      );
    }
  }

  // change the selected country code at the phone step
  onChangeSelected(e: countryCode) {
    // clear the input
    this.phoneFormGroup.patchValue({
      phone: '',
    });
    // make the input untouched to not display the error message
    this.phoneFormGroup.get('phone')?.markAsUntouched();
    // change the selected country which passed from the country list component
    this.selectedCounty = e;
  }

  // captcha response
  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }

  onSubmit() {
    this.communicateService.phone.set(
      `${this.selectedCounty.code}.${this.number}`,
    );
    this.communicateService.backWord.set('/sign-up');
    this.communicateService.forward.set('/verified/upPhone');
    // start make the request to the server
    const req: registerUserRequest = {
      fullName: this.parentData.name.trim(),
      phoneNumber: `+${this.selectedCounty.code}${this.number}`,
      recaptchaString: this.captcha,
    };
    this.loading.set(true);
    this.signUpService
      .createUser(req)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/otpVerification']);
        },
        (err) => {
          // reset the form , recaptcha and loader
          this.phoneFormGroup.reset({
            phone: '',
          });
          this.phoneFormGroup.get('phone')?.markAsUntouched();
          grecaptcha.reset();
          this.captcha = '';
          this.loading.set(false);
        },
      );
  }
}
