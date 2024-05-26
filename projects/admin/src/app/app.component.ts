import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { ToastModule } from 'primeng/toast';
import { CompanyOverviewComponent } from './features/company-profile/pages/overview/components/company-overview/company-overview.component';
import { CompanyCardComponent } from './features/company-profile/pages/overview/components/company-card/company-card.component';
import { HeadOfCompanyComponent } from './features/company-profile/pages/overview/components/head-of-company/head-of-company.component';
import { CompanyDetailsComponent } from './features/company-profile/pages/overview/components/company-details/company-details.component';
import { SidebarComponent } from './features/company-profile/shared-components/sidebar/sidebar.component';
import { NavBarComponent } from './features/company-profile/shared-components/nav-bar/nav-bar.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastModule,CompanyOverviewComponent,CompanyCardComponent,HeadOfCompanyComponent,CompanyDetailsComponent,SidebarComponent,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'admin';

  ngOnInit(): void {}
}
