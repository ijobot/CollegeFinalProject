import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Combatant } from '../models';

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

  checkLogInCredentials(username: string | null, password: string | null): Observable<any> {
    return this.http.post(`${this.expressUrl}/login/login`, { username, password });
  }

  checkSignUpCredentials(username: string | null, password: string | null): Observable<any> {
    return this.http.post(`${this.expressUrl}/login/signup`, { username, password });
  }

  getHome(): Observable<any> {
    return this.http.get(`${this.expressUrl}/home`);
  }

  getBattlefield(): Observable<any> {
    return this.http.get(`${this.expressUrl}/battlefield`);
  }

  saveParty(combatants: Combatant[]): Observable<any> {
    return this.http.post(`${this.expressUrl}/battlefield/saveParty`, { combatants });
  }

  loadParty(): Observable<any> {
    return this.http.get(`${this.expressUrl}/battlefield/loadParty`);
  }
}
