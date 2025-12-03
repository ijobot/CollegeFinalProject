import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatantList } from './combatant-list.component';

describe('CombatantList', () => {
  let component: CombatantList;
  let fixture: ComponentFixture<CombatantList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombatantList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatantList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
