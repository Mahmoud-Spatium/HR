export interface availableAuthWay {
  timestamp: string;
  message: string;
  result: authWayResult;
}

export interface authWayResult {
  authenticationsTypes: AuthenticationsType[];
}

export interface AuthenticationsType {
  enumValue: number;
  enumString: string;
}

export interface validateUserLogin {
  timestamp: string;
  message: string;
  result: userLoginResult;
}

export interface userLoginResult {
  id: string;
  fullName: string;
  token: Token;
  phoneNumber: string;
  statusID: number;
  status: string;
  nextAllowedLoginDateTime: string;
  userCompanies: UserCompany[];
}

export interface Token {
  accessToken: string;
  refreshToken: any;
  expiresIn: number;
  expiresDate: string;
}

export interface UserCompany {
  companyId: string;
  companyName: string;
  accountRoleId: string;
  accountRoleName: string;
  isFirstLoging: boolean;
  parentCompanyName: any;
}

export interface companySignIn {
  timestamp: string;
  message: string;
  result: companySignInResult;
}

export interface companySignInResult {
  token: Token;
  userId: string;
  companyId: string;
  isFirstLogin: boolean;
  expireDate: any;
  nextAllowedLoginDateTime: any;
  accountStatusId: number;
  accountStatus: string;
}
