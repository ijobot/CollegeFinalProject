import { APIResponseMonster, ConvertedMonster } from './models';

export class Utils {
  static convertMonsterList(monsterList: APIResponseMonster[]): ConvertedMonster[] {
    const convertedMonsterList: ConvertedMonster[] = [];
    monsterList.forEach((monster) => {
      convertedMonsterList.push({
        name: monster.name,
        statBlockUrl: 'https://www.dndbeyond.com/monsters/' + monster.index,
      });
    });
    return convertedMonsterList;
  }
}
