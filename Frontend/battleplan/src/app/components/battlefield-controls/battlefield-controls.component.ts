import { Component, inject } from '@angular/core';
import { CombatantType, ModalText, ModalContent } from '../../models';
import { ModalService } from '../../services/modal.service';
import { CombatantService } from '../../services/combatant.service';
import { CommonModule } from '@angular/common';
import { BlurAfterClickDirective } from '../../utils/blur-after-click.directive';
import html2canvas from 'html2canvas';

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

      <!-- INITIATIVE/SAVE/LOAD/CLEAR/SNAPSHOT BUTTONS -->
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
        <button
          id="share"
          class="button-font-size"
          blurAfterClick
          (click)="handleGeneratePicture()"
          [disabled]="!(combatants$ | async)?.length"
        >
          Snapshot
        </button>
      </div>
      <a href="" id="downloadLink" download hidden></a>
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

  // Setting and openning the modal to add a combatant.
  handleAddCombatantClick(type: CombatantType, modalText: ModalText): void {
    this.modalService.setModalAppearance(type, modalText, ModalContent.addCombatant);
    this.modalService.openModal();
  }

  // Take a snapshot - triggers automatic download so user can drag and drop a PNG file into a group chat on any platform.
  handleGeneratePicture(): void {
    const battlefield = document.getElementById('canvas') as HTMLElement;
    const downloadLink = document.getElementById('downloadLink') as HTMLElement;
    // Resolving rendering issues in the preflight prerparation (text is lowered through a bug in the library).
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');
    // Taking the snapshot of just the combatant list area of the page and then setting it as the download file on the hidden link.
    html2canvas(battlefield).then((canvas) => {
      downloadLink.setAttribute('href', canvas.toDataURL());
    });
    // Giving 1 full second for the PNG file to be created and attached to the link before clicking.
    setTimeout(() => {
      downloadLink.click();
    }, 1000);
  }

  // Toggling initiative on and off (some games don't use it).
  handleToggleInitiative(): void {
    this.combatantService.toggleInitiative();
  }

  // Setting and openning the modal to save a party.
  handleSavePartyClick(): void {
    this.modalService.setModalAppearance(
      CombatantType.default,
      ModalText.save,
      ModalContent.saveParty
    );
    this.modalService.openModal();
  }

  // Setting and openning the modal to load a previously saved party.
  handleLoadSavedPartyClick(): void {
    this.modalService.setModalAppearance(
      CombatantType.default,
      ModalText.load,
      ModalContent.loadParty
    );
    this.modalService.openModal();
  }

  // Setting and openning the modal to be able to clear the current on-screen list.
  // This does not effect the database.
  handleClearAllClick(): void {
    this.modalService.setModalAppearance(
      CombatantType.default,
      ModalText.clear,
      ModalContent.clearAll
    );
    this.modalService.openModal();
  }
}
