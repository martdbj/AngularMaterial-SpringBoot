import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignButton } from './assign-button';

describe('AssignButton', () => {
  let component: AssignButton;
  let fixture: ComponentFixture<AssignButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignButton],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
