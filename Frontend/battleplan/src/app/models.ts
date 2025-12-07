export interface APIResponseMonster {
  index: string;
  name: string;
  url: string;
}

export interface ConvertedMonster {
  name: string;
  statBlockUrl: string;
}

export enum CSSTheme {
  default = 'default-theme',
  fantasy = 'fantasy-theme',
}

export interface Combatant {
  type: CombatantType;
  name: string;
  score: number;
}

export enum CombatantType {
  player = 'Player',
  monster = 'Monster',
  npc = 'NPC',
  default = 'Default',
}

export interface ModalAppearance {
  combatantType: CombatantType;
  modalText: ModalText;
  modalContent: ModalContent;
  combatant?: Combatant;
}

export enum ModalText {
  player = 'Add Player',
  monster = 'Add Monster',
  npc = 'Add NPC',
  save = 'Save Current Party?',
  load = 'Load Saved Party?',
  clear = 'Clear All Combatants?',
  updateName = 'Update Combatant Name',
  updateType = 'Update Combatant Type',
  updateScore = 'Update Combatant Score',
  signIn = 'Please Log In',
  signUp = 'Please Sign Up',
  logInSuccess = 'Login Successful!',
  signUpSuccess = 'Signup Successful!',
}

export enum ModalContent {
  addCombatant = 'addCombatant',
  saveParty = 'saveParty',
  loadParty = 'loadParty',
  clearAll = 'clearAll',
  updateName = 'updateName',
  updateType = 'updateType',
  updateScore = 'updateScore',
  logIn = 'logIn',
  signUp = 'signUp',
  success = 'success',
}

export const STARTING_COMBATANTS: Combatant[] = [
  {
    name: 'Pellius',
    type: CombatantType.player,
    score: 21,
  },
  {
    name: 'Yellowblood',
    type: CombatantType.monster,
    score: 18,
  },
  {
    name: 'Capu',
    type: CombatantType.player,
    score: 16,
  },
  {
    name: 'Zeja',
    type: CombatantType.npc,
    score: 10,
  },
  {
    name: 'Lapis',
    type: CombatantType.player,
    score: 4,
  },
];
