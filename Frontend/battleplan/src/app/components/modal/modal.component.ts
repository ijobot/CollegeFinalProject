import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CombatantType, ModalText, ModalContent, Combatant } from '../../models';
import { CombatantService } from '../../services/combatant.service';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../utils/clickoutside.directive';
import { CombatantEntryFormComponent } from '../combatant-entry-form/combatant-entry-form.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, CombatantEntryFormComponent, ClickOutsideDirective],
  template: `
    <div class="overlay">
      <div class="main-modal" (clickOutside)="handleCloseModal()">
        @if (modalAppearance$ | async; as modal) {
          <div
            class="content-container content"
            [ngClass]="modal.combatantType.toLowerCase()"
            >
            <h1 class="title">{{ modal.modalText }}</h1>
            <!-- MODAL CONTENTS FOR ADDING COMBATANTS -->
            @if (modal.modalContent == 'addCombatant') {
              <ng-content>
                <app-combatant-entry-form
                  [combatantType]="combatantType"
                  [modalText]="modal.modalText"
                  ></app-combatant-entry-form
                ></ng-content>
              }
              <!-- MODAL CONTENTS FOR UPDATING NAMES -->
              @if (modal.modalContent == 'updateName') {
                <ng-content>
                  <app-combatant-entry-form
                    [updateAttribute]="'name'"
                    [combatantType]="combatantType"
                    [modalText]="modal.modalText"
                    ></app-combatant-entry-form
                  ></ng-content>
                }
                <!-- MODAL CONTENTS FOR UPDATING TYPES -->
                @if (modal.modalContent == 'updateType') {
                  <ng-content>
                    <app-combatant-entry-form
                      [updateAttribute]="'type'"
                      [combatantType]="combatantType"
                      [modalText]="modal.modalText"
                      ></app-combatant-entry-form
                    ></ng-content>
                  }
                  <!-- MODAL CONTENTS FOR UPDATING SCORES -->
                  @if (modal.modalContent == 'updateScore') {
                    <ng-content>
                      <app-combatant-entry-form
                        [updateAttribute]="'score'"
                        [combatantType]="combatantType"
                        [modalText]="modal.modalText"
                        ></app-combatant-entry-form
                      ></ng-content>
                    }
                    <!-- MODAL CONTENTS FOR SAVING A PARTY -->
                    @if (modal.modalContent == 'saveParty') {
                      <div class="party-function-buttons">
                        <button (click)="handleSaveAll()" [disabled]="!(combatants$ | async)?.length">
                          Save
                        </button>
                        <button (click)="handleCloseModal()">Cancel</button>
                      </div>
                    }
                    <!-- MODAL CONTENTS FOR LOADING A PARTY -->
                    @if (modal.modalContent == 'loadParty') {
                      <div class="party-function-buttons">
                        <button (click)="handleLoadSavedParty()">Load Group</button>
                        <button (click)="handleCloseModal()">Cancel</button>
                      </div>
                    }
                    <!-- MODAL CONTENTS FOR CONFIRMING A "CLEAR ALL" -->
                    @if (modal.modalContent == 'clearAll') {
                      <div class="party-function-buttons">
                        <button (click)="handleClearAll()">Yes</button>
                        <button (click)="handleCloseModal()">No</button>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
    `,
  styles: ``,
})
export class ModalComponent {
  private modalService = inject(ModalService);
  private combatantService = inject(CombatantService);

  modalAppearance$ = this.modalService.modalAppearance$;
  combatantType: CombatantType = CombatantType.default;
  modalText: ModalText = ModalText.clear;
  modalContent: ModalContent = ModalContent.clearAll;
  combatant?: Combatant;
  combatants$: Observable<Combatant[]> = this.combatantService.combatants$;

  handleCloseModal(): void {
    this.modalService.closeModal();
  }

  handleSaveAll(): void {
    this.combatantService.saveCurrentCombatants();
    this.modalService.closeModal();
  }

  handleLoadSavedParty(): void {
    this.combatantService.loadSavedCombatants();
    this.modalService.closeModal();
  }

  handleClearAll(): void {
    this.combatantService.clearAllCombatants();
    this.modalService.closeModal();
  }
}
