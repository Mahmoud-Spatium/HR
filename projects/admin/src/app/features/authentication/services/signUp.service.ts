import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  registerCompanyRequest,
  registerUserRequest,
  Response,
  signupOtpVerifiedRequest,
} from '../models/signUp.models';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class signUpService {
  http = inject(HttpClient);
  createUser(userData: registerUserRequest) {
    return this.http.post<Response>(
      `${environment.baseAPI}/Account/Register`,
      userData,
    );
  }

  createCompany(companyData: registerCompanyRequest) {
    return this.http.post(
      `${environment.baseAPI}/Account/RegisterCompany`,
      companyData,
    );
  }
  phoneOtpVerification(data: signupOtpVerifiedRequest) {
    return this.http.post(
      `${environment.baseAPI}/Account/VerifyPhoneNumberOTP`,
      data,
    );
  }
  resendPhoneOtp(number: string) {
    return this.http.post(
      `${environment.baseAPI}/Account/ReSendConfirmPhoneNumberOTP`,
      {
        phoneNumber: number,
      },
    );
  }

  emailOtpVerification(emailData: { email: string; otp: string }) {
    return this.http.post(
      `${environment.baseAPI}/Account/ValidateOtpToEmail`,
      emailData,
    );
  }

  resendEmailOtp(email: string) {
    return this.http.post(`${environment.baseAPI}/Account/ReSendOtpToEmail`, {
      email,
    });
  }
}
