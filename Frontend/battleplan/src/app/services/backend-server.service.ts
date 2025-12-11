import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Combatant, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BackendServerService {
  private expressUrl = 'http://localhost:5000';
  private http = inject(HttpClient);
  constructor() {}

  getLogin(): Observable<any> {
    return this.http.get(`${this.expressUrl}/login`);
  }

  getUserIdByUsername(username: string): Observable<any> {
    return this.http.get(`${this.expressUrl}/login/:${username}`);
  }

  checkLogInCredentials(username: string | null, password: string | null): Observable<any> {
    return this.http.post(`${this.expressUrl}/login/login`, { username, password });
  }

  checkSignUpCredentials(username: string | null, password: string | null): Observable<any> {
    return this.http.post(`${this.expressUrl}/login/signup`, { username, password });
  }

  loadParty(username: string): Observable<any> {
    return this.http.get(`${this.expressUrl}/battlefield/:${username}`);
  }

  saveParty(combatants: Combatant[], currentUser: User | null): Observable<any> {
    if (currentUser === null) {
      return of(EMPTY);
    }
    return this.http.post(`${this.expressUrl}/battlefield/saveParty`, {
      combatants,
      currentUser,
    });
  }
}
