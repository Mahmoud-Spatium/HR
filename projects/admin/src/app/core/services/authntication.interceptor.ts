import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthnticationInterceptor implements HttpInterceptor {
  authEndpoints = [
    'RegisterCompany',
    'ValidateOtpToEmail',
    'SendOtpToEmail',
    'ReSendOtpToEmail',
    'Upload',
    'Bulk',
    'Documents',
    'CompanyLogin',
    'SendEmailOTPForgetPassword',
    'ReSendEmailOTPForgetPassword',
    'ConfirmForgetPasswordOtpEmail',
    'SetForgetPasswordAsync',
  ];
  intercept(req: any, next: any) {
    let endPoint = req.url.split('/');
    endPoint = endPoint[endPoint.length - 1];
    if (this.authEndpoints.includes(endPoint)) {
      const clone = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token'),
        ),
      });
      return next.handle(clone);
    }
    return next.handle(req);
  }
}
