import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalAppearance, ModalContent, ModalText } from '../models';
import { Combatant, CombatantType } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal$ = new Observable<boolean>();
  modalAppearance$ = new Observable<ModalAppearance>();
  combatantToUpdate?: Combatant;

  private _modal$ = new BehaviorSubject(false);
  private _modalAppearance$ = new BehaviorSubject<ModalAppearance>({
    combatantType: CombatantType.player,
    modalText: ModalText.player,
    modalContent: ModalContent.addCombatant,
  });

  constructor() {
    this.modal$ = this._modal$.asObservable();
    this.modalAppearance$ = this._modalAppearance$.asObservable();
  }

  // The modal's appearance is set by whichever component calls for it to be openned.
  // The contents (text, color, inputs, and functionality) are passed in, making this modal extremely adaptable.
  setModalAppearance(
    combatantType: CombatantType,
    modalText: ModalText,
    modalContent: ModalContent,
    combatant?: Combatant
  ): void {
    if (combatant) {
      this.combatantToUpdate = combatant;
    }
    this._modalAppearance$.next({
      combatantType,
      modalText,
      modalContent,
      ...(combatant ? combatant : undefined),
    });
  }

  getCombatantToUpdate(): Combatant | undefined {
    return this.combatantToUpdate;
  }

  openModal(): void {
    this._modal$.next(true);
  }

  closeModal(): void {
    this._modal$.next(false);
  }
}
