import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConvertedMonster } from '../models';
import { Utils } from '../utils/utils';
import { withFetch } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  private URL = 'https://www.dnd5eapi.co/api/2014/monsters';
  private _monsterList$ = new BehaviorSubject<ConvertedMonster[]>([]);
  monsterList$ = new Observable<ConvertedMonster[]>();

  constructor() {
    this.monsterList$ = this._monsterList$.asObservable();
  }

  async getMonsters() {
    // Is automatically called by the HomeComponent after a successful login
    if (this._monsterList$.getValue().length === 0) {
      // Only performs call once so user can switch between pages without constantly retrieving the same data
      try {
        const response = await fetch(this.URL);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const { results } = await response.json();
        const convertedMonsters = Utils.convertMonsterList(results);
        // Uses a utility function to convert the API response to an array of objects the application can more easily work with
        console.log(convertedMonsters);
        this._monsterList$.next(convertedMonsters);
      } catch (error) {
        // Error handling so application doesn't crash if there is ever an issue with the external API
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    } else {
      return;
      // If monster list is already loaded, this function will fail gracefully
    }
  }
}
