import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PhoneInputComponent } from './phoneInput/phoneInput.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgClass,
    PhoneInputComponent,
    RouterLink,
    TranslateModule,
  ],
})
export class UserProfileComponent implements OnInit {
  userForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    // form group Initialization
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        this.nameRules.bind(this) as ValidatorFn,
      ]),
    });
  }

  // Valid Name
  validUserNameMessages() {
    return;
  }

  // Custom Valid Name Function
  nameRules(control: FormControl) {
    if (
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value) ||
      /[0-9]/.test(control.value)
    ) {
      return { SorN: true };
    }
    // both name and company check for spaces
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
