import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatantListComponent } from './combatant-list.component';

describe('CombatantListComponent', () => {
  let component: CombatantListComponent;
  let fixture: ComponentFixture<CombatantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombatantListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CombatantListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
