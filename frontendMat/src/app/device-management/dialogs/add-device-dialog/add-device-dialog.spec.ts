import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceDialog } from './add-device-dialog';

describe('AddDeviceDialog', () => {
  let component: AddDeviceDialog;
  let fixture: ComponentFixture<AddDeviceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeviceDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDeviceDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
