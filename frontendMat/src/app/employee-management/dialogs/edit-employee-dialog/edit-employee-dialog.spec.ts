import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeDialog } from './edit-employee-dialog';

describe('EditEmployeeDialog', () => {
  let component: EditEmployeeDialog;
  let fixture: ComponentFixture<EditEmployeeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeeDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmployeeDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
