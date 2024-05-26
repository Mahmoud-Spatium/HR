import { CommunicationService } from './../../../../services/commuication.service';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  imports: [TranslateModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent {
  CommunicationService = inject(CommunicationService);
  phone = this.CommunicationService.phone;
  userCompany = this.CommunicationService.userCompany;
  constructor(private router: Router) {}

  navigate(id: string) {
    this.CommunicationService.selectedCompanyId.set(id);
    this.router.navigate(['/sign-in/enterPassword']);
  }
}
