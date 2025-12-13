import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  canActivate(): boolean {
    // Check LocalStorage to see if a currentUser is logged in, and if so, block them from manually entering the URL for login.
    // This ensures they do not attempt to sign in under a second profile and potentially corrupt the database.
    const currentUser = !!this.localStorageService.getData('Current User');
    if (currentUser) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
