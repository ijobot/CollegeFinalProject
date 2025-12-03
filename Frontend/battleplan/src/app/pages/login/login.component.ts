import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../../services/monster.service';

@Component({
  selector: 'app-Login',
  imports: [],
  template: ` <p>Login works!</p> `,
  styles: ``,
})
export class LoginComponent implements OnInit {
  monsterService = inject(MonsterService);

  ngOnInit(): void {
    // TODO: Move this into the "successful login functionality"
    this.monsterService.initiateService();
    this.monsterService.monsterList$.subscribe((data) => console.log(data));
  }
}
