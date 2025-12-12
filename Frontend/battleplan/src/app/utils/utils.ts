import { APIResponseMonster, CombatantType, ConvertedMonster, ModalText } from '../models';

export class Utils {
  static convertMonsterList(monsterList: APIResponseMonster[]): ConvertedMonster[] {
    const convertedMonsterList: ConvertedMonster[] = [];
    monsterList.forEach((monster) => {
      convertedMonsterList.push({
        name: monster.name,
        statBlockUrl: monster.index,
      });
    });
    return convertedMonsterList;
  }

  static getTypeFromModalText(modalText: ModalText): CombatantType {
    switch (modalText) {
      case ModalText.monster:
        return CombatantType.monster;
      case ModalText.npc:
        return CombatantType.npc;
      default:
        return CombatantType.player;
    }
  }
}
