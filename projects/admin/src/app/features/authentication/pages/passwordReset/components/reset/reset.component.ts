import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PasswordInputComponent } from '../../../../shared-components/passwordInput/passwordInput.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PasswordInputComponent, RouterLink, TranslateModule],
})
export class ResetComponent {
  constructor() {}
}
