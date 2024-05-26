export interface confirmPasswordReset {
  timestamp: string;
  message: string;
  result: Result;
}

export interface Result {
  token: Token;
}

export interface Token {
  accessToken: string;
  refreshToken: any;
  expiresIn: number;
  expiresDate: string;
}
