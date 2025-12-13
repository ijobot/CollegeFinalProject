import { APIResponseMonster, CombatantType, ConvertedMonster, ModalText } from '../models';

export class Utils {
  // Helper function to pull in the data from the API and mutate it into a more
  // accessible, usable, and application-appropriate form.
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

  // Helper function to infer CombatantType based on which "Add" button was clicked.
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
