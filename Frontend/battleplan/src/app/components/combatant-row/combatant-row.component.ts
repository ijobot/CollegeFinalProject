import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Combatant, ModalContent, ModalText } from '../../models';
import { CombatantService } from '../../services/combatant.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-combatant-row',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  template: `
    <div class="row" [ngClass]="combatant.type.toLowerCase()">
      <!-- COMBATANT NAME -->
      @if (combatant.statBlockUrl.length && combatant.type == 'Monster') {
      <!-- If the combatantType is Monster and the name was chosen from the autocomplete's monster codex,
         this applies the link icon for users to click and visit thier stat block page on the official website. -->
      <div class="row-item row-link center-text">
        <a
          class="monster-link"
          [href]="'https://www.dndbeyond.com/monsters/' + combatant.statBlockUrl"
          target="_blank"
          >🔗</a
        >
      </div>
      } @else {
      <!-- Otherwise, an empty div with the same size is retained to ensure consistent spacing with all other rows. -->
      <div class="row-item row-name center-text"></div>
      }
      <div class="row-item row-name center-text">
        <button
          [ngClass]="combatant.type.toLowerCase()"
          class="light row-font-size"
          (click)="handleUpdateCombatant(modalText.updateName, modalContent.updateName)"
        >
          {{ combatant.name }}
        </button>
      </div>

      <!-- COMBATANT TYPE -->
      <div class="row-item row-type center-text hidden">
        <button
          [ngClass]="combatant.type.toLowerCase()"
          class="light row-font-size"
          (click)="handleUpdateCombatant(modalText.updateType, modalContent.updateType)"
        >
          {{ combatant.type }}
        </button>
      </div>

      <!-- COMBATANT SCORE -->
      <div class="row-item row-score center-text">
        <button
          [ngClass]="combatant.type.toLowerCase()"
          class="light row-font-size"
          (click)="handleUpdateCombatant(modalText.updateScore, modalContent.updateScore)"
        >
          @if (initiative$ | async) {
          <!-- Initiative Score is able to be on or off, as some games still require a combatant list but don't use scoring. -->
          {{ combatant.score }}
          }
        </button>
      </div>

      <!-- DELETE ROW -->
      <div class="row-delete">
        <button (click)="handleRemoveCombatant(index)" aria-label="remove combatant from list">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class CombatantRowComponent {
  private combatantService = inject(CombatantService);
  private modalService = inject(ModalService);

  @Input() combatant: Combatant = {} as Combatant;
  @Input() index: number = 0;

  modalText = ModalText;
  modalContent = ModalContent;
  initiative$ = this.combatantService.initiative$;

  // Clicking the X button on a row deletes the combatant.
  handleRemoveCombatant(index: number): void {
    this.combatantService.removeCombatant(index);
  }

  // Clicking any attribute button on a row triggers the update modal.
  handleUpdateCombatant(updateAttribute: ModalText, modalContent: ModalContent): void {
    this.modalService.setModalAppearance(
      this.combatant.type,
      updateAttribute,
      modalContent,
      this.combatant
    );
    this.modalService.openModal();
  }
}
