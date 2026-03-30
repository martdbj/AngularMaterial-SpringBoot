import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DeviceService } from '../../../services/device.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delete-device-dialog',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle],
  templateUrl: './delete-device-dialog.html',
  styleUrl: './delete-device-dialog.css',
})
export class DeleteDeviceDialog {

  deviceService = inject(DeviceService);

  data = inject(MAT_DIALOG_DATA);
  deviceId: string = this.data;

  private dialog = inject(MatDialogRef<DeleteDeviceDialog>);

  closeDialog() {
    this.dialog.close(true);
  }

  deleteOnSubmit() {
    this.deviceService.deleteDeviceById(this.deviceId).subscribe(() => {
      this.dialog.close(true);
      this.closeDialog();
    });
  }
}
