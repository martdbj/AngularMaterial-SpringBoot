import { Component, inject, signal } from '@angular/core';
import { form, FormField, maxLength, pattern, required, submit } from '@angular/forms/signals';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';
import { AddDeviceDialog } from '../add-device-dialog/add-device-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-device-dialog',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle, FormField],
  templateUrl: './edit-device-dialog.html',
  styleUrl: './edit-device-dialog.css',
})
export class EditDeviceDialog {

  deviceService = inject(DeviceService);

  private dialog = inject(MatDialogRef<AddDeviceDialog>);

  data = inject(MAT_DIALOG_DATA);
  deviceSerialNumber: string = this.data;

  editDeviceModel = signal<Device>({
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

  ngOnInit(): void {
    this.deviceService.getDeviceBySerialNumber(this.deviceSerialNumber).subscribe(device => {
      this.editDeviceModel.set({
        serialNumber: device.serialNumber,
        name: device.name,
        type: device.type,
        employeeId: device.employeeId
      });
    });
  }

  updateForm = form(this.editDeviceModel, (fieldPath) => {
    maxLength(fieldPath.name, 255, { message: 'Name cannot be longer than 255 characters' });
    pattern(fieldPath.name, /^[a-zA-Z0-9 ]+$/, { message: 'Name cannot contain special characters' });
    required(fieldPath.serialNumber, { message: 'Serial Number is required' });
    required(fieldPath.name, { message: 'Description is required' });
    required(fieldPath.type, { message: 'Type is required' });
  })

  closeDialog() {
    this.dialog.close(true);
  }

  updateOnSubmit(event: Event) {
    event.preventDefault();

    submit(this.updateForm, async () => {

      const updatedName = this.updateForm.name().value();
      const updatedType = this.updateForm.type().value();

      const deviceData = this.editDeviceModel();
      deviceData.name = updatedName;
      deviceData.type = updatedType;

      this.deviceService.updateDeviceBySerialNumber(this.deviceSerialNumber, deviceData).subscribe(() => {
        this.closeDialog();
        this.editDeviceModel.set(this.clearDeviceModel);
      });
    });
  }
}
