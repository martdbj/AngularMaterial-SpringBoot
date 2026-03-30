import { Component, inject, signal } from '@angular/core';
import { form, FormField, maxLength, pattern, required, submit } from '@angular/forms/signals';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-device-dialog',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle, FormField, MatSelectModule],
  templateUrl: './add-device-dialog.html',
  styleUrl: './add-device-dialog.css',
})
export class AddDeviceDialog {

  deviceService = inject(DeviceService);

  private dialog = inject(MatDialogRef<AddDeviceDialog>);

  addDeviceModel = signal<Device>({
    serialNumber: '',
    name: '',
    type: NaN,
    employeeId: ""
  })

  clearDeviceModel = {
    serialNumber: '',
    name: '',
    type: NaN,
    employeeId: ""
  }

  addForm = form(this.addDeviceModel, (fieldPath) => {
    maxLength(fieldPath.name, 255, { message: 'Name cannot be longer than 255 characters' });
    pattern(fieldPath.name, /^[a-zA-Z0-9 ]+$/, { message: 'Name cannot contain special characters' });
    required(fieldPath.serialNumber, { message: 'Serial Number is required' });
    required(fieldPath.name, { message: 'Description is required' });
    required(fieldPath.type, { message: 'Type is required' });
  })

  closeDialog() {
    this.dialog.close(true);
  }

  addOnSubmit(event: Event) {
    event.preventDefault();

    submit(this.addForm, async () => {
      const serailNumber = this.addForm.serialNumber().value();
      const deviceName = this.addForm.name().value();
      const deviceType = this.addForm.type().value();

      const newDevice: Device = {
        serialNumber: serailNumber,
        name: deviceName,
        type: deviceType,
        employeeId: ''
      };

      this.deviceService.addNewDevice(newDevice).subscribe(() => {
        this.addDeviceModel.set(this.clearDeviceModel);
        this.closeDialog();
      })
    })
  };
}
