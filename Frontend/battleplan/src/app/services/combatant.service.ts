import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Combatant, CombatantType } from '../models';
import { BackendServerService } from './backend-server.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CombatantService {
  private localStorageService = inject(LocalStorageService);
  private backendServerService = inject(BackendServerService);

  private _combatants$ = new BehaviorSubject<Combatant[]>([]);
  private _initiative$ = new BehaviorSubject<boolean>(true);

  combatants$ = new Observable<Combatant[]>();
  initiative$ = new Observable<boolean>();

  constructor() {
    this.combatants$ = this._combatants$.asObservable();
    this.initiative$ = this._initiative$.asObservable();
  }

  toggleInitiative(): void {
    this._initiative$.next(!this._initiative$.getValue());
  }

  addCombatant(type: CombatantType, name: string, score: number): void {
    // Create new combatant object
    const newestCombatant: Combatant = {
      type,
      name,
      score,
    };

    // Add to combatants array
    const updatedCombatants = [...this._combatants$.getValue(), newestCombatant];

    // Sort list
    this.sortCombatants(updatedCombatants);
  }

  removeCombatant(index: number): void {
    this._combatants$.getValue().splice(index, 1);
    this._combatants$.next([...this._combatants$.getValue()]);
  }

  editCombatant(
    combatant: Combatant,
    updateType: string,
    newValue: string | number | CombatantType
  ): void {
    // Update correct property
    switch (updateType) {
      case 'name':
        combatant.name = newValue as string;
        break;
      case 'type':
        combatant.type = newValue as CombatantType;
        break;
      default:
        combatant.score = newValue as number;
    }

    // Re-sort list based on changes
    this.sortCombatants();
  }

  sortCombatants(updatedCombatants?: Combatant[]): void {
    // Check if argument is passed, and if not, just sort current list
    if (!updatedCombatants) {
      this._combatants$.next([...this._combatants$.getValue().sort((a, b) => b.score - a.score)]);
    } else {
      // Check if initiative is turned off, and if so, just display the list unsorted
      if (this._initiative$.getValue() == false) {
        this._combatants$.next(updatedCombatants);
      }
      // Otherwise, sort the list with the newly added combatant
      this._combatants$.next(updatedCombatants.sort((a, b) => Number(b.score) - Number(a.score)));
    }
  }

  saveCurrentCombatants(): void {
    // Save only works if combatants are on the list
    const user = this.localStorageService.getData('Current User');
    if (user) {
      const userParsed = JSON.parse(user.trim());
      if (this._combatants$.getValue().length && userParsed) {
        this.backendServerService
          .saveParty(this._combatants$.getValue(), userParsed)
          .subscribe((data) => {
            console.log(data);
          });
      }
    }
  }

  loadSavedCombatants(): void {
    // Load only works if previous combatants have been saved
    const user = this.localStorageService.getData('Current User');
    if (user) {
      const userParsed = JSON.parse(user);
      this.backendServerService.loadParty(userParsed.username).subscribe((data) => {
        const updatedCombatants = [...data];
        this.sortCombatants(updatedCombatants);
        this._combatants$.next(updatedCombatants);
      });
    }
  }

  clearAllCombatants(): void {
    // Does not affect combatants saved in database - just clears the list
    this._combatants$.next([]);
  }
}
