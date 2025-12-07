import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  getHome(): Observable<any> {
    return this.http.get(`${this.expressUrl}/home`);
  }

  getBattlefield(): Observable<any> {
    return this.http.get(`${this.expressUrl}/battlefield`);
  }
}
