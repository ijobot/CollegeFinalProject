import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import { BackendServerService } from './backend-server.service';
import { LocalStorageService } from './local-storage.service';
import { CombatantService } from './combatant.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendServerService = inject(BackendServerService);
  private localStorageService = inject(LocalStorageService);
  private _currentUser$ = new BehaviorSubject<User | null>(null);
  currentUser$ = new Observable<User | null>();

  constructor() {
    this.currentUser$ = this._currentUser$.asObservable();
  }

  setCurrentUser(username: string): void {
    this.backendServerService.getUserIdByUsername(username).subscribe((data: User) => {
      this._currentUser$.next(data);
      this.localStorageService.saveData('Current User', JSON.stringify(data));
      // this.localStorageService.saveData('Saved Party', sourceCall === 'fromSignUp')
    });
    this.backendServerService.loadParty(username).subscribe((data) => {
      if (data.length) {
        this.localStorageService.saveData('Saved Party', 'true');
      } else {
        this.localStorageService.saveData('Saved Party', 'false');
      }
    });
  }

  getCurrentUsername(): string | null {
    return this._currentUser$.getValue()?.username || null;
  }

  logUserOut(): void {
    this.localStorageService.clearData();
    this._currentUser$.next(null);
  }
}
