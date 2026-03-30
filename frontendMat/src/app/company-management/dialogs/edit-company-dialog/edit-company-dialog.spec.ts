import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyDialog } from './edit-company-dialog';

describe('EditCompanyDialog', () => {
  let component: EditCompanyDialog;
  let fixture: ComponentFixture<EditCompanyDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCompanyDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCompanyDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
