import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CombatantType, ModalText, Combatant } from '../../models';
import { CombatantService } from '../../services/combatant.service';
import { ModalService } from '../../services/modal.service';
import { Utils } from '../../utils/utils';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormFocusDirective } from '../../utils/autofocus.directive';

@Component({
  selector: 'app-combatant-entry-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFocusDirective, MatSelectModule, A11yModule],
  template: `
    <!-- COMBATANT CREATION -->
    @if (!updateAttribute) {
    <ng-content>
      <form [formGroup]="combatantCreationForm" (ngSubmit)="onCreationSubmit()" cdkTrapFocus>
        <div class="field">
          <div class="label-and-input">
            <label for="name">Combatant Name:</label
            ><input
              formFocus
              class="large-field"
              id="name"
              type="text"
              [placeholder]="name?.dirty && name?.value == '' ? 'Name required' : 'Enter name'"
              formControlName="name"
            />
          </div>
        </div>
        @if (initiative$ | async) {
        <ng-content>
          <div class="field">
            <div class="label-and-input">
              <label for="score">Initiative Score:</label
              ><input
                class="large-field"
                id="score"
                type="text"
                [placeholder]="
                  score?.dirty && score?.value == '' ? 'Score required' : 'Enter score'
                "
                formControlName="score"
              />
            </div>
          </div>
        </ng-content>
        }
        <div class="buttons">
          <button type="submit" [disabled]="!combatantCreationForm.valid">Submit</button>
          <button type="button" (click)="handleCloseModal()">Cancel</button>
        </div>
      </form>
    </ng-content>
    } @else {
    <form [formGroup]="combatantUpdateForm" (ngSubmit)="onUpdateSubmit()" cdkTrapFocus>
      <!-- NAME UPDATE FORM -->
      @if (updateAttribute == 'name') {
      <ng-content>
        <div class="field">
          <div class="label-and-input">
            <label for="updateName">Combatant Name:</label
            ><input
              formFocus
              class="large-field"
              id="updateName"
              type="text"
              [placeholder]="combatant ? combatant.name : ''"
              formControlName="updateName"
            />
          </div>
        </div>
        <div class="buttons">
          <button type="submit" [disabled]="!updateName?.dirty">Submit</button>
          <button type="button" (click)="handleCloseModal()">Cancel</button>
        </div>
      </ng-content>
      }
      <!-- TYPE UPDATE FORM -->
      @if (updateAttribute == 'type') {
      <ng-content>
        <div class="field">
          <div class="label-and-input">
            <label for="updateType">Combatant Type:</label
            ><select #options (change)="onSelection(options.value)" formFocus>
              <option [value]="combatant?.type" selected>
                {{ combatant?.type }}
              </option>
              <option [value]="selectOptions[1]">{{ selectOptions[1] }}</option>
              <option [value]="selectOptions[2]">{{ selectOptions[2] }}</option>
            </select>
          </div>
        </div>
        <div class="buttons">
          <button type="submit" [disabled]="!selectionMade">Submit</button>
          <button type="button" (click)="handleCloseModal()">Cancel</button>
        </div>
      </ng-content>
      }
      <!-- SCORE UPDATE FORM -->
      @if (updateAttribute == 'score') {
      <ng-content>
        <div class="field">
          <div class="label-and-input">
            <label for="updateScore">Initiative Score:</label
            ><input
              formFocus
              class="large-field"
              id="updateScore"
              type="text"
              [placeholder]="combatant ? combatant.score : ''"
              formControlName="updateScore"
            />
          </div>
        </div>
        <div class="buttons">
          <button type="submit" [disabled]="!updateScore?.dirty">Submit</button>
          <button type="button" (click)="handleCloseModal()">Cancel</button>
        </div>
      </ng-content>
      }
    </form>
    }
  `,
  styles: `
  form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  font-size: 2rem;

  .field {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .label-and-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    label {
      margin-right: var(--spacing-l);
    }

    input {
      height: 40px;
      width: 250px;
      font-size: 2rem;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-l);
  }

  button {
    max-width: fit-content;
  }
}`,
})
export class CombatantEntryFormComponent implements OnInit {
  private modalService = inject(ModalService);
  private combatantService = inject(CombatantService);

  @Input() combatantType: CombatantType = CombatantType.default;
  @Input() modalText: ModalText = ModalText.player;
  @Input() updateAttribute?: string;

  initiative$ = this.combatantService.initiative$;
  combatant: Combatant | undefined = this.modalService.getCombatantToUpdate();
  selectOptions: CombatantType[] = [CombatantType.player, CombatantType.monster, CombatantType.npc];
  selection: CombatantType = CombatantType.player;
  selectionMade: boolean = false;

  combatantCreationForm: FormGroup;
  combatantUpdateForm: FormGroup;

  constructor() {
    this.combatantCreationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      score: new FormControl('0', [Validators.required]),
    });
    this.combatantUpdateForm = new FormGroup({
      updateName: new FormControl<string>(''),
      updateScore: new FormControl<number>(0),
      updateType: new FormControl<CombatantType>(CombatantType.player),
    });
  }

  get name() {
    return this.combatantCreationForm.get('name');
  }

  get score() {
    return this.combatantCreationForm.get('score');
  }

  get updateName() {
    return this.combatantUpdateForm.get('updateName');
  }

  get updateScore() {
    return this.combatantUpdateForm.get('updateScore');
  }

  ngOnInit(): void {
    // If updating, set the name, type, and score of the combatant
    this.combatantUpdateForm.controls['updateName'].setValue(
      this.combatant ? this.combatant.name : ''
    );
    this.populateTypeDropdown();
    this.combatantUpdateForm.controls['updateScore'].setValue(
      this.combatant ? this.combatant.score : ''
    );
  }

  onCreationSubmit(): void {
    // Since we don't have a combatant yet, configure combatantType based on modal's text
    const combatantType = Utils.getTypeFromModalText(this.modalText);

    if (this.combatantCreationForm.valid) {
      this.combatantService.addCombatant(
        combatantType,
        this.combatantCreationForm.value.name,
        this.combatantCreationForm.value.score
      );
      this.modalService.closeModal();
    }
  }

  onUpdateSubmit(): void {
    if (this.combatant) {
      if (this.updateAttribute == 'name') {
        this.combatantService.editCombatant(
          this.combatant,
          this.updateAttribute,
          this.updateName?.value
        );
      }

      if (this.updateAttribute == 'type') {
        this.combatantService.editCombatant(this.combatant, this.updateAttribute, this.selection);
      }

      if (this.updateAttribute == 'score') {
        this.combatantService.editCombatant(
          this.combatant,
          this.updateAttribute,
          this.updateScore?.value
        );
      }
      this.modalService.closeModal();
    }
  }

  populateTypeDropdown(): void {
    if (this.combatant) {
      const otherTypes = this.selectOptions.filter((type) => type != this.combatant?.type);
      this.selectOptions = [this.combatant.type, ...otherTypes];
    }
  }

  onSelection(value: string): void {
    this.selectionMade = true;
    this.selection = value as CombatantType;
  }

  handleCloseModal(): void {
    this.modalService.closeModal();
  }
}
