import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CombatantType, ModalText, ModalContent, Combatant } from '../../models';
import { CombatantService } from '../../services/combatant.service';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { CombatantEntryFormComponent } from '../combatant-entry-form/combatant-entry-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { UserService } from '../../services/user.service';
import { ClickOutsideDirective } from '../../utils/clickoutside.directive';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, CombatantEntryFormComponent, LoginFormComponent, ClickOutsideDirective],
  template: `
    <div class="overlay">
      <div class="main-modal">
        @if (modalAppearance$ | async; as modal) {
        <div class="content-container content" [ngClass]="modal.combatantType.toLowerCase()">
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
              (clickOutside)="handleCloseModal()"
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
              (clickOutside)="handleCloseModal()"
              [updateAttribute]="'score'"
              [combatantType]="combatantType"
              [modalText]="modal.modalText"
            ></app-combatant-entry-form
          ></ng-content>
          }
          <!-- MODAL CONTENTS FOR SAVING A PARTY -->
          @if (modal.modalContent == 'saveParty') {
          <div class="party-function-buttons" (clickOutside)="handleCloseModal()">
            <button (click)="handleSaveAll()" [disabled]="!(combatants$ | async)?.length">
              Save Party
            </button>
            <button (click)="handleCloseModal()">Cancel</button>
          </div>
          }
          <!-- MODAL CONTENTS FOR LOADING A PARTY -->
          @if (modal.modalContent == 'loadParty') {
          <div class="party-function-buttons" (clickOutside)="handleCloseModal()">
            <button (click)="handleLoadSavedParty()">Load Party</button>
            <button (click)="handleCloseModal()">Cancel</button>
          </div>
          }
          <!-- MODAL CONTENTS FOR CONFIRMING A "CLEAR ALL" -->
          @if (modal.modalContent == 'clearAll') {
          <div class="party-function-buttons" (clickOutside)="handleCloseModal()">
            <button (click)="handleClearAll()">Yes</button>
            <button (click)="handleCloseModal()">No</button>
          </div>
          }
          <!-- MODAL CONTENTS FOR LOGGING IN -->
          @if (modal.modalContent == 'logIn') {
          <ng-content>
            <app-login-form
              [entryType]="'logIn'"
              (clickOutside)="handleCloseModal()"
            ></app-login-form>
          </ng-content>
          }
          <!-- MODAL CONTENTS FOR SIGNING UP -->
          @if (modal.modalContent == 'signUp') {
          <ng-content>
            <app-login-form
              [entryType]="'signUp'"
              (clickOutside)="handleCloseModal()"
            ></app-login-form>
          </ng-content>
          }
        </div>
        }
      </div>
    </div>
  `,
  // Again, forms are the only parts of this application that have thier own dedicated CSS for easier management.
  styles: `
  .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  .main-modal {
    position: absolute;
    height: fit-content;
    width: max-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--spacing-l);

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 4rem;
        text-align: center;
        line-height: 1;
        margin-bottom: var(--spacing-l);
      }

      .party-function-buttons {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
`,
})
export class ModalComponent {
  private modalService = inject(ModalService);
  private combatantService = inject(CombatantService);

  modalAppearance$ = this.modalService.modalAppearance$;
  combatantType: CombatantType = CombatantType.default;
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
