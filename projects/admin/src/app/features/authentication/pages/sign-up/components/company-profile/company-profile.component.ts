import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PasswordInputComponent } from '../../../../shared-components/passwordInput/passwordInput.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    PasswordInputComponent,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyProfileComponent implements OnInit {
  companyForm!: FormGroup;
  constructor() {}

  ngOnInit() {
    this.companyForm = new FormGroup({
      company: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        this.nameRules.bind(this) as ValidatorFn,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
      ]),
    });
  }

  // valid Email
  validEmail() {
    const email = this.companyForm.get('email');
    return email?.hasError('required')
      ? 'Please Enter Email *'
      : email?.hasError('pattern')
        ? 'Please Enter Valid Email *'
        : '';
  }

  // Custom Valid Name Function
  nameRules(control: FormControl) {
    // if the control is company check for special char
    if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value)) {
      return { specialChar: true };
    }
    // company check for spaces
    if (control.value) {
      let arr = Array.from(control.value),
        count = 0;
      arr.forEach((e, i) => {
        if (arr[i + 1] === e && e === ' ') {
          ++count;
        }
      });
      return count > 0 ? { spaces: true } : null;
    }
    // control is valid return null for no errors
    return null;
  }
}
