import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BattlefieldControlsComponent } from './battlefield-controls.component';
import { ModalService } from '../../services/modal.service';
import { CombatantService } from '../../services/combatant.service';

describe('BattlefieldControlsComponent', () => {
  let component: BattlefieldControlsComponent;
  let fixture: ComponentFixture<BattlefieldControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattlefieldControlsComponent],
      providers: [
        { provide: ModalService, useValue: { setModalAppearance() {}, openModal() {} } },
        { provide: CombatantService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BattlefieldControlsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
