import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmployeeDialog } from './delete-employee-dialog';

describe('DeleteEmployeeDialog', () => {
  let component: DeleteEmployeeDialog;
  let fixture: ComponentFixture<DeleteEmployeeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEmployeeDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteEmployeeDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
