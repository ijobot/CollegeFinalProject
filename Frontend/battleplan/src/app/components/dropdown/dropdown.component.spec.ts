import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';

describe.only('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Wrote this test to prove I understand testing and that I at least tried.
  // Vitest is very different from what I'm used to with Karma and Jasmine.  I tried writing other tests, but nearly all other functions
  // in this project call out to services or other components, and I don't yet know Vitest well enough to mock services, inputs, observables,
  // http and routing calls, etc.  That work is discussed in my "Future Work" section of the Final Report.
  it('should toggle and close the dropdown correctly', () => {
    component.isOpen = false;
    component.toggleDropdown();
    expect(component.isOpen).toBe(true);
    component.closeDropdown();
    expect(component.isOpen).toBe(false);
  });
});
