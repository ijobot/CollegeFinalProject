import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BattlefieldControlsComponent } from '../../components/battlefield-controls/battlefield-controls.component';
import { CombatantListComponent } from '../../components/combatant-list/combatant-list.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { MonsterService } from '../../services/monster.service';
import { ConvertedMonster } from '../../models';

@Component({
  selector: 'app-combatants',
  imports: [
    CommonModule,
    BattlefieldControlsComponent,
    CombatantListComponent,
    ModalComponent,
    NavbarComponent,
  ],
  template: `
    <app-navbar class="nav-container"></app-navbar>
    <div class="page-container">
      <!-- LOGO AND BUTTON MENU -->
      <div class="battlefield-container">
        <div class="content-container controls-grid-item">
          <app-battlefield-controls></app-battlefield-controls>
        </div>

        <!-- BATTLEFIELD INFORMATION AREA -->
        <div id="canvas" class="content-container combatants-grid-item">
          <app-combatant-list></app-combatant-list>
        </div>
      </div>
    </div>

    <!-- DYNAMIC MODAL DISPLAY -->
    @if (showModal$ | async) {
    <app-modal></app-modal>
    }
  `,
  styles: ``,
  standalone: true,
})
export class BattlefieldComponent implements OnInit {
  private monsterService = inject(MonsterService);
  private modalService = inject(ModalService);

  showModal$: Observable<boolean> = this.modalService.modal$;

  constructor() {}

  ngOnInit(): void {
    this.monsterService.getMonsters();
  }
}
