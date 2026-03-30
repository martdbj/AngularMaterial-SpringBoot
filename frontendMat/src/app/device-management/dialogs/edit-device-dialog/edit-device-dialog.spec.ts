import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceDialog } from './edit-device-dialog';

describe('EditDeviceDialog', () => {
  let component: EditDeviceDialog;
  let fixture: ComponentFixture<EditDeviceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeviceDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDeviceDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
