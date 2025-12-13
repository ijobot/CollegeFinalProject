import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CombatantType, ModalText, ConvertedMonster, Combatant } from '../../models';
import { CombatantService } from '../../services/combatant.service';
import { ModalService } from '../../services/modal.service';
import { MonsterService } from '../../services/monster.service';
import { FormFocusDirective } from '../../utils/autofocus.directive';
import { Utils } from '../../utils/utils';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-combatant-entry-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormFocusDirective,
    MatSelectModule,
    A11yModule,
    MatAutocomplete,
    MatAutocompleteModule,
  ],
  template: `
    <!-- COMBATANT CREATION -->
    @if (!updateAttribute) {
    <!-- If we're not updating a current combatant, we get the full form. -->
    <ng-content>
      <form [formGroup]="combatantCreationForm" (ngSubmit)="onCreationSubmit()" cdkTrapFocus>
        <div class="field">
          <div class="label-and-input">
            <label for="name">Combatant Name:</label>
            @if (modalText == 'Add Monster') {
            <input
              [matAutocomplete]="auto"
              formFocus
              class="large-field"
              id="name"
              type="text"
              [placeholder]="name?.dirty && name?.value == '' ? 'Name required' : 'Enter name'"
              formControlName="name"
            />
            <mat-autocomplete #auto="matAutocomplete">
              @for (monster of filteredMonsterList; track monster; let i = $index) {
              <mat-option [value]="monster.name">{{ monster.name }}</mat-option>
              }
            </mat-autocomplete>
            } @else {
            <input
              formFocus
              class="large-field"
              id="name"
              type="text"
              [placeholder]="name?.dirty && name?.value == '' ? 'Name required' : 'Enter name'"
              formControlName="name"
            />
            }
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
    <!-- If we're updating a current combatant, we only get the input specific to what we're updating (name, type, or score). -->
    <form [formGroup]="combatantUpdateForm" (ngSubmit)="onUpdateSubmit()" cdkTrapFocus>
      <!-- NAME UPDATE FORM -->
      @if (updateAttribute == 'name') {
      <ng-content>
        <div class="field">
          <div class="label-and-input">
            <label for="updateName">Combatant Name:</label>
            @if (combatant?.type == 'Monster') {
            <!-- If updating a monster's name, ensure we bring the autocomplate form back up so the user can choose another monster if they wish. -->
            <input
              [matAutocomplete]="auto"
              formFocus
              class="large-field"
              id="updateName"
              type="text"
              [placeholder]="
                updateName?.dirty && updateName?.value == '' ? 'Name required' : 'Enter name'
              "
              formControlName="updateName"
            />
            <mat-autocomplete #auto="matAutocomplete">
              @for (monster of filteredMonsterList; track monster; let i = $index) {
              <mat-option [value]="monster.name">{{ monster.name }}</mat-option>
              }
            </mat-autocomplete>
            } @else {
            <input
              formFocus
              class="large-field"
              id="updateName"
              type="text"
              [placeholder]="combatant ? combatant.name : ''"
              formControlName="updateName"
            />
            }
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
  private monsterService = inject(MonsterService);

  @Input() combatantType: CombatantType = CombatantType.default;
  @Input() modalText: ModalText = ModalText.player;
  @Input() updateAttribute?: string;

  initiative$ = this.combatantService.initiative$;
  monsterList: ConvertedMonster[] = [];
  filteredMonsterList: ConvertedMonster[] = [];
  combatant: Combatant | undefined = this.modalService.getCombatantToUpdate();
  selectOptions: CombatantType[] = [CombatantType.player, CombatantType.monster, CombatantType.npc];
  selection: CombatantType = CombatantType.player;
  selectionMade: boolean = false;

  combatantCreationForm: FormGroup;
  combatantUpdateForm: FormGroup;

  constructor() {
    // In the creation form, the CombatantType is discerned by the modal text.
    this.combatantCreationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      score: new FormControl('0', [Validators.required]),
    });
    // In the update form, the CombatantType is already known.
    this.combatantUpdateForm = new FormGroup({
      updateName: new FormControl<string>(''),
      updateScore: new FormControl<number>(0),
      updateType: new FormControl<CombatantType>(CombatantType.player),
    });
    // Allows for autocomplete dropdown to dynamically adjust options as user types in the the input.
    this.combatantCreationForm.get('name')?.valueChanges.subscribe((response) => {
      this.filterMonsters(response);
    });
    // Having both lists allows for the autocomplete form to react to the user deleting their input (all monsters come back as options).
    this.monsterService.monsterList$.subscribe((data) => {
      this.monsterList = data;
      this.filteredMonsterList = data;
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
    // If updating, set the name, type, and score of the combatant.
    this.combatantUpdateForm.controls['updateName'].setValue(
      this.combatant ? this.combatant.name : ''
    );
    this.populateTypeDropdown();
    this.combatantUpdateForm.controls['updateScore'].setValue(
      this.combatant ? this.combatant.score : ''
    );
  }

  // Helper function for the autocomplete list.
  filterMonsters(enteredText: string): void {
    this.filteredMonsterList = this.monsterList.filter((item) => {
      return item.name.toLowerCase().indexOf(enteredText.toLowerCase()) > -1;
    });
  }

  onCreationSubmit(): void {
    // Since we don't have a combatant yet, configure combatantType based on modal text.
    const combatantType = Utils.getTypeFromModalText(this.modalText);

    if (this.combatantCreationForm.valid) {
      if (combatantType === 'Monster') {
        // If combatant is a new monster, check to see if a monster was chosen from the autocomplete list,
        // or if the user typed in some other name.  Add statBlock if possible, or supply empty string.
        const statBlock = this.monsterService.getMonsterStatBlockLink(
          this.combatantCreationForm.value.name
        );
        this.combatantService.addCombatant(
          combatantType,
          this.combatantCreationForm.value.name,
          this.combatantCreationForm.value.score,
          statBlock
        );
      } else {
        this.combatantService.addCombatant(
          combatantType,
          this.combatantCreationForm.value.name,
          this.combatantCreationForm.value.score,
          ''
        );
      }
      this.modalService.closeModal();
    }
  }

  // Slightly different functionality depending on which attribute is being changed.
  onUpdateSubmit(): void {
    if (this.combatant) {
      if (this.updateAttribute == 'name') {
        // If updating a monster's name, ensure the user can still choose another monster or just type whatever they wish.
        const statBlock = this.monsterService.getMonsterStatBlockLink(this.updateName?.value);
        this.combatantService.editCombatant(
          this.combatant,
          this.updateAttribute,
          this.updateName?.value,
          statBlock
        );
      }

      if (this.updateAttribute == 'type') {
        this.combatantService.editCombatant(
          this.combatant,
          this.updateAttribute,
          this.selection,
          this.combatant.statBlockUrl
        );
      }

      if (this.updateAttribute == 'score') {
        this.combatantService.editCombatant(
          this.combatant,
          this.updateAttribute,
          this.updateScore?.value,
          this.combatant.statBlockUrl
        );
      }
      this.modalService.closeModal();
    }
  }

  // Populates the dropdown with the currently selected type first, follwed by the other 2
  populateTypeDropdown(): void {
    if (this.combatant) {
      const otherTypes = this.selectOptions.filter((type) => type != this.combatant?.type);
      this.selectOptions = [this.combatant.type, ...otherTypes];
    }
  }

  // Updates chosen player type on the dropdown menu so value can be sent to updateCombatant.
  onSelection(value: string): void {
    this.selectionMade = true;
    this.selection = value as CombatantType;
  }

  handleCloseModal(): void {
    this.modalService.closeModal();
  }
}
