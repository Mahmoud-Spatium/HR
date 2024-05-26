import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { confirmPasswordReset } from '../models/resetPassword.interface';

@Injectable({ providedIn: 'root' })
export class passwordResetService {
  http = inject(HttpClient);
  // send Otp to email
  sendEmailOtp(email: string, recaptchaString: string) {
    return this.http.post(
      `${environment.baseAPI}/Account/SendEmailOTPForgetPassword`,
      {
        email,
        recaptchaString,
      },
    );
  }
  // Resend Email Otp
  resendEmailOtp(email: string) {
    return this.http.post(
      `${environment.baseAPI}/Account/ReSendEmailOTPForgetPassword`,
      {
        email,
      },
    );
  }

  // confirm email otp
  confirmEmailOtp(email: string, otp: string) {
    return this.http.post<confirmPasswordReset>(
      `${environment.baseAPI}/Account/ConfirmForgetPasswordOtpEmail`,
      {
        email,
        otp,
      },
    );
  }

  // reset password
  resetPassword(newPassword: string) {
    return this.http.post(
      `${environment.baseAPI}/Account/SetForgetPasswordAsync`,
      {
        newPassword,
      },
    );
  }
}
