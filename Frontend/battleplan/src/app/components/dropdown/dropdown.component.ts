
import { Component } from '@angular/core';
import { ThemeSelectionComponent } from '../theme-selection/theme-selection.component';
import { ClickOutsideDirective } from '../../utils/clickoutside.directive';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ThemeSelectionComponent, ClickOutsideDirective],
  template: `
    <div class="dropdown-container">
      <a
        class="themes-link"
        (click)="toggleDropdown()"
        onclick="this.blur()"
        (clickOutside)="closeDropdown()"
        >
        Theme
      </a>
      @if (this.isOpen) {
        <div class="dropdown-menu">
          <app-theme-selection></app-theme-selection>
        </div>
      }
    </div>
    `,
  styles: ``,
})
export class DropdownComponent {
  isOpen: boolean = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
