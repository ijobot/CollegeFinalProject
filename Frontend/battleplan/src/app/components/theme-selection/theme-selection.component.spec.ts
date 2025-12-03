import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSelection } from './theme-selection.component';

describe('ThemeSelection', () => {
  let component: ThemeSelection;
  let fixture: ComponentFixture<ThemeSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
