import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service.service';
import { CSSTheme } from '../../models';

@Component({
  selector: 'app-theme-selection',
  standalone: true,
  imports: [],
  template: `
    <div class="content-container">
      <div class="theme-menu">
        <a (click)="handleThemeSelection(theme.default)">Default</a>
        <a (click)="handleThemeSelection(theme.fantasy)">Fantasy</a>
      </div>
    </div>
  `,
  styles: `.content-container {
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

    a {
      font-size: 2rem;
      cursor: pointer;
    }
  }
}
`,
})
export class ThemeSelectionComponent {
  private themeService = inject(ThemeService);

  theme = CSSTheme;

  handleThemeSelection(theme: CSSTheme): void {
    this.themeService.setTheme(theme);
  }
}
