import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatantEntryForm } from './combatant-entry-form.component';

describe('CombatantEntryForm', () => {
  let component: CombatantEntryForm;
  let fixture: ComponentFixture<CombatantEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombatantEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatantEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
