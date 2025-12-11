import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service.service';
import { CSSTheme } from '../../models';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CombatantService } from '../../services/combatant.service';

@Component({
  selector: 'app-theme-selection',
  standalone: true,
  imports: [],
  template: `
    <div class="content-container">
      <div class="theme-menu">
        <p>Themes:</p>
        <a (click)="handleThemeSelection(theme.default)"> - Default</a>
        <a (click)="handleThemeSelection(theme.fantasy)"> - Fantasy</a>
        <div class="line-break"></div>
        <a (click)="handleSignOut()">Sign Out</a>
      </div>
    </div>
  `,
  styles: `
  .content-container {
    position: relative;
    border-bottom: solid 8px rgb(50, 50, 50);
    border-left: solid 8px rgb(120, 120, 120);
    border-top: solid 8px rgb(120, 120, 120);
    border-right: solid 8px rgb(50, 50, 50);

    .theme-menu {
      display: flex;
      flex-direction: column;
      gap: 20px;
      text-align: start;

      a, p {
        font-size: 2rem;
      }
      a {
        cursor: pointer;
      }
    }
  }
  `,
})
export class ThemeSelectionComponent {
  private themeService = inject(ThemeService);
  private userService = inject(UserService);
  private combatantService = inject(CombatantService);
  private router = inject(Router);

  theme = CSSTheme;

  handleThemeSelection(theme: CSSTheme): void {
    this.themeService.setTheme(theme);
  }

  // Added to this component for ease, as redevloping the dropdown would be too time consuming.
  // Will update this in a future iteration, as this functionality is better suited elsewhere.
  handleSignOut(): void {
    this.userService.logUserOut();
    this.combatantService.clearAllCombatants();
    this.router.navigate(['/login']);
  }
}
