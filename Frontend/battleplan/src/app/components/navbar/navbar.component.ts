import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [DropdownComponent, RouterLink, RouterLinkActive],
  template: `
    <div class="nav-wrapper">
      <div class="main-nav">
        <!-- Logo -->
        <div class="nav-column">
          <p class="nav-logo">Battle Plan</p>
        </div>

        <!-- Home and About Navigation -->
        <div class="nav-column">
          <div class="nav-menu">
            <a
              routerLink="/home"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              >Home</a
            >
            <a routerLink="/battlefield" routerLinkActive="active-link">Battlefield</a>
            <a routerLink="/about" routerLinkActive="active-link">About</a>
          </div>
        </div>

        <!-- Theme Selections -->
        <div class="nav-column">
          <app-dropdown></app-dropdown>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavbarComponent {}
