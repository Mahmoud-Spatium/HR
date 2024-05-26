export interface registerUserRequest {
  fullName: string;
  phoneNumber: string;
  recaptchaString: string;
}

export interface registerCompanyRequest {
  companyName: string;
  email: string;
  password: string;
}

export interface Response {
  timestamp: string;
  message: string;
  result: null | string;
}

export interface signupOtpVerifiedRequest {
  phoneNumber: string;
  otp: string;
}
