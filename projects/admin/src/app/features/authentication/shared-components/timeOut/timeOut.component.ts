import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommunicationService } from '../../services/commuication.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-timeOut',
  templateUrl: './timeOut.component.html',
  styleUrls: ['./timeOut.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, RouterLink],
})
export class TimeOutComponent {
  communicationService = inject(CommunicationService);
  back = this.communicationService.backWord();
}
