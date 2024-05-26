import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailsComponent {

}
