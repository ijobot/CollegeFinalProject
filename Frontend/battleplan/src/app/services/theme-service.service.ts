import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CSSTheme } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Service for updating the root HTML with an overall theme className.
  // This is a much simpler approach than changing multiple classes throughout the project, and thus far easier to manage.
  private document = inject(DOCUMENT);
  private _currentTheme$ = new BehaviorSubject<CSSTheme>(CSSTheme.default);

  currentTheme$ = new Observable<CSSTheme>();

  constructor() {
    this.currentTheme$ = this._currentTheme$.asObservable();
  }

  setTheme(theme: CSSTheme): void {
    const mainHTML = this.document.getElementById('app-root');

    if (mainHTML) {
      mainHTML.classList.remove(
        CSSTheme.default,
        CSSTheme.fantasy,
        CSSTheme.cyberpunk,
        CSSTheme.grimdark
      );
      mainHTML.classList.add(theme);
      this._currentTheme$.next(theme);
    }
  }
}
