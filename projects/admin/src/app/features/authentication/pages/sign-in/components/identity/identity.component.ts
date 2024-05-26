import { signInService } from './../../../../services/signIn.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommunicationService } from '../../../../services/commuication.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
  standalone: true,
  imports: [RouterLink, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityComponent implements OnInit {
  number!: string;
  communicationServ = inject(CommunicationService);
  signInService = inject(signInService);
  constructor(private router: Router) {}

  ngOnInit() {
    this.number = this.communicationServ.phone();
  }

  navigate() {
    this.signInService.userLogin(this.number).subscribe((res) => {
      this.communicationServ.backWord.set('/sign-in/identity');
      this.communicationServ.forward.set('/verified/inOtp');
      this.router.navigate(['otpVerification']);
    });
  }
}
