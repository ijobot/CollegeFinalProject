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
    const currentUser = !!this.localStorageService.getData('Current User');
    if (currentUser) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
