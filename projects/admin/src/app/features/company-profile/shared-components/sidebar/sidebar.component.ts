import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLinkActive,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  collapsed = signal(false);
  sidebarWidth = computed(()=>this.collapsed()? '88px' : '260px');
  logo = computed(()=>this.collapsed()? '75px':'236px');
 


}
