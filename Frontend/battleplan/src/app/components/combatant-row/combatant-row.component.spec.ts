import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatantRow } from './combatant-row.component';

describe('CombatantRow', () => {
  let component: CombatantRow;
  let fixture: ComponentFixture<CombatantRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombatantRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatantRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
