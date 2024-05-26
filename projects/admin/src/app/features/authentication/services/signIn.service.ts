import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {
  availableAuthWay,
  companySignIn,
  validateUserLogin,
} from '../models/signIn.models';

@Injectable({ providedIn: 'root' })
export class signInService {
  http = inject(HttpClient);
  // Available Authentication Ways
  availableWay(number: string, captcha: string) {
    return this.http.post<availableAuthWay>(
      `${environment.baseAPI}/Account/AvailableAuthenticationWays`,
      {
        phoneNumberOrUserId: String(number),
        recaptchaString: captcha,
      },
    );
  }

  // userLogin
  userLogin(number: string) {
    return this.http.post(`${environment.baseAPI}/Account/UserLogin`, {
      phoneNumberOrUserId: number,
    });
  }

  // validate user login otp
  validateLogin(number: string, otp: string) {
    return this.http.post<validateUserLogin>(
      `${environment.baseAPI}/Account/ConfirmPhonNumberLoginOTP`,
      {
        phoneNumberOrUserId: number,
        otp: otp,
      },
    );
  }

  // resend user login otp
  resendUserLoginOtp(number: string) {
    return this.http.post(`${environment.baseAPI}/Account/ResendUserLoginOtp`, {
      phoneNumberOrUserId: number,
    });
  }

  // login Company
  loginCompany(companyId: string, password: string) {
    return this.http.post<companySignIn>(
      `${environment.baseAPI}/Account/CompanyLogin`,
      {
        companyId,
        password,
      },
    );
  }
}
