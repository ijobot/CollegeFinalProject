import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatantsComponent } from './combatants.component';

describe('Combatants', () => {
  let component: CombatantsComponent;
  let fixture: ComponentFixture<CombatantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombatantsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CombatantsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
