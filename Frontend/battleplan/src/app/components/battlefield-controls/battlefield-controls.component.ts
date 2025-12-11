import { Component, inject } from '@angular/core';
import { CombatantType, ModalText, ModalContent } from '../../models';
import { ModalService } from '../../services/modal.service';
import { CombatantService } from '../../services/combatant.service';
import { CommonModule } from '@angular/common';
import { BlurAfterClickDirective } from '../../utils/blur-after-click.directive';

@Component({
  selector: 'app-battlefield-controls',
  standalone: true,
  imports: [CommonModule, BlurAfterClickDirective],
  template: `
    <div class="main-button-menu">
      <!-- PLAYER/MONSTER/NPC BUTTONS -->
      <div class="buttons-array combatant-add-buttons">
        <button
          class="player light button-font-size"
          (click)="handleAddCombatantClick(combatantType.player, modalText.player)"
        >
          Add Player
        </button>
        <button
          class="monster light button-font-size"
          (click)="handleAddCombatantClick(combatantType.monster, modalText.monster)"
        >
          Add Monster
        </button>
        <button
          class="npc light button-font-size"
          (click)="handleAddCombatantClick(combatantType.npc, modalText.npc)"
        >
          Add NPC
        </button>
      </div>

      <!-- INITIATIVE/SAVE/LOAD/CLEAR BUTTONS -->
      <div class="buttons-array function-buttons">
        <button class="button-font-size" blurAfterClick (click)="handleToggleInitiative()">
          Initiative {{ (initiative$ | async) ? 'Off' : 'On' }}
        </button>
        <button
          class="button-font-size"
          blurAfterClick
          (click)="handleSavePartyClick()"
          [disabled]="!(combatants$ | async)?.length"
        >
          Save Party
        </button>
        <button class="button-font-size" blurAfterClick (click)="handleLoadSavedPartyClick()">
          Load Party
        </button>
        <button class="button-font-size" blurAfterClick (click)="handleClearAllClick()">
          Clear All
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class BattlefieldControlsComponent {
  private modalService = inject(ModalService);
  private combatantService = inject(CombatantService);

  combatantType = CombatantType;
  modalText = ModalText;
  initiative$ = this.combatantService.initiative$;
  combatants$ = this.combatantService.combatants$;

  // Adding a combatant
  handleAddCombatantClick(type: CombatantType, modalText: ModalText): void {
    this.modalService.setModalAppearance(type, modalText, ModalContent.addCombatant);
    this.modalService.openModal();
  }

  // Toggling initiative on and off (some games don't use it)
  handleToggleInitiative(): void {
    this.combatantService.toggleInitiative();
  }

  // Saving a party
  handleSavePartyClick(): void {
    this.modalService.setModalAppearance(
      CombatantType.default,
      ModalText.save,
      ModalContent.saveParty
    );
    this.modalService.openModal();
  }

  // Loading a saved party
  handleLoadSavedPartyClick(): void {
    this.modalService.setModalAppearance(
      CombatantType.default,
      ModalText.load,
      ModalContent.loadParty
    );
    this.modalService.openModal();
  }

  // Clearing the list
  handleClearAllClick(): void {
    this.modalService.setModalAppearance(
      CombatantType.default,
      ModalText.clear,
      ModalContent.clearAll
    );
    this.modalService.openModal();
  }
}
