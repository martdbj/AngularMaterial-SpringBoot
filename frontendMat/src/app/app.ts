import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CustomSidenav } from './custom-sidenav/custom-sidenav';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    CustomSidenav
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    private breakpointObserver: BreakpointObserver) { }

  protected readonly title = signal('frontendFin');

  collapsed = signal(true);


  sidenavWidth = computed(() => this.collapsed() ? '60px' : '250px')

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 500px)');
  }


}
