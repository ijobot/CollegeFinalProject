import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConvertedMonster } from '../models';
import { Utils } from '../utils/utils';

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

  async initiateService() {
    try {
      const response = await fetch(this.URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const { results } = await response.json();
      const convertedMonsters = Utils.convertMonsterList(results);
      this._monsterList$.next(convertedMonsters);

      // console.log(this._monsterList$);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
