import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { CompaniesComponent } from './pages/sign-in/components/companies/companies.component';
import { DetailsComponent } from './pages/sign-in/components/details/details.component';
import { EnterPasswordComponent } from './pages/sign-in/components/enter-password/enter-password.component';
import { IdentityComponent } from './pages/sign-in/components/identity/identity.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CompanyFilesComponent } from './pages/sign-up/components/company-files/company-files.component';
import { CompanyProfileComponent } from './pages/sign-up/components/company-profile/company-profile.component';
import { UserProfileComponent } from './pages/sign-up/components/user-profile/user-profile.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { StartAuthComponent } from './pages/start-auth/start-auth.component';
import { VerificationComponent } from './shared-components/otpVerification/verification.component';
import { VerifiedComponent } from './shared-components/verified/verified.component';
import { WrapperComponent } from './shared-components/wrapper/wrapper.component';
import { PasswordResetComponent } from './pages/passwordReset/passwordReset.component';
import { EmailComponent } from './pages/passwordReset/components/email/email.component';
import { ResetComponent } from './pages/passwordReset/components/reset/reset.component';
import { TimeOutComponent } from './shared-components/timeOut/timeOut.component';
import { BlockedComponent } from './pages/sign-in/components/blocked/blocked.component';
import { CounterComponent } from './pages/sign-in/components/counter/counter.component';

export const authRoutes: Routes = [
  {
    // Authentication feature
    path: '',
    component: AuthenticationComponent,
    children: [
      // wrapper and pages display inside of it
      {
        path: '',
        component: WrapperComponent,
        children: [
          { path: '', component: StartAuthComponent },
          {
            path: 'sign-up',
            component: SignUpComponent,
            children: [
              { path: '', component: UserProfileComponent },
              { path: 'company-profile', component: CompanyProfileComponent },
              { path: 'company-files', component: CompanyFilesComponent },
            ],
          },
          { path: 'counter', component: CounterComponent },
          { path: 'blocked', component: BlockedComponent },
          {
            path: 'otpVerification',
            component: VerificationComponent,
          },
          {
            path: 'sign-in',
            component: SignInComponent,
            children: [
              { path: '', component: DetailsComponent },
              { path: 'identity', component: IdentityComponent },
              { path: 'enterPassword', component: EnterPasswordComponent },
            ],
          },
          {
            path: 'passwordReset',
            component: PasswordResetComponent,
            children: [
              { path: 'email', component: EmailComponent },
              { path: 'reset', component: ResetComponent },
            ],
          },
        ],
      },
      // pages which display out of wrapper
      {
        path: 'verified/:from',
        component: VerifiedComponent,
      },
      { path: 'companies', component: CompaniesComponent },
      { path: 'timeOut', component: TimeOutComponent },
    ],
  },
];
