import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import { BackendServerService } from './backend-server.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendServerService = inject(BackendServerService);
  private _currentUser$ = new BehaviorSubject<User>({ id: 0, username: 'default' });
  currentUser$ = new Observable<User>();

  constructor() {
    this.currentUser$ = this._currentUser$.asObservable();
  }

  setCurrentUser(username: string): void {
    this.backendServerService.getUserIdByUsername(username).subscribe((data: User) => {
      this._currentUser$.next(data);
    });
  }
}
