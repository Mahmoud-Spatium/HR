import { Injectable, signal } from '@angular/core';
import { UserCompany } from '../models/signIn.models';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  // communication service for shared components
  backWord = signal<string>('');
  forward = signal<string>('');
  phone = signal<string>('');
  email = signal<string>('');
  // from signIn to identity component
  availableAuthWay = signal<{ phone: boolean; authApp: boolean }>({
    phone: false,
    authApp: false,
  });
  // from signIn otp validation to companies component
  userCompany = signal<UserCompany[]>([]);
  // from companies to sign in component
  selectedCompanyId = signal<string>('');
  // blocking date for wrong company login
  blockingDate = signal<string>('');
}
