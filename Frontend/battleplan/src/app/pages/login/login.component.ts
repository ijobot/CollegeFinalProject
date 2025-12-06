import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../../services/monster.service';
import { BackendServerService } from '../../services/backend-server.service';

@Component({
  selector: 'app-Login',
  imports: [],
  template: `<div>
    <button (click)="getLoginRouter()">Get LoginRouter</button>
  </div>`,
  styles: ``,
})
export class LoginComponent {
  private backendServer = inject(BackendServerService);

  getLoginRouter() {
    this.backendServer.getLogin().subscribe((data) => console.log(data));
  }
}
