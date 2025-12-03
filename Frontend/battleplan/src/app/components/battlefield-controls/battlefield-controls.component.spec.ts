import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldControls } from './battlefield-controls.component';

describe('BattlefieldControls', () => {
  let component: BattlefieldControls;
  let fixture: ComponentFixture<BattlefieldControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattlefieldControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattlefieldControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
