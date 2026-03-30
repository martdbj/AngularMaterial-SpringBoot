import { Component, inject } from '@angular/core';
import { DeviceService } from '../../../services/device.service';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DeleteDeviceDialog } from '../delete-device-dialog/delete-device-dialog';
import { EmployeeService } from '../../../services/employee.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-unassign-device-dialog',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle],
  templateUrl: './unassign-device-dialog.html',
  styleUrl: './unassign-device-dialog.css',
})
export class UnassignDeviceDialog {

  employeeService = inject(EmployeeService);
  deviceService = inject(DeviceService);

  data = inject(MAT_DIALOG_DATA);
  deviceId: string = this.data;

  private dialog = inject(MatDialogRef<DeleteDeviceDialog>);

  closeDialog() {
    this.dialog.close(true);
  }

  unassignOnSubmit() {
    let employeeId: string = "";
    this.deviceService.getDeviceBySerialNumber(this.deviceId).subscribe(device => {
      employeeId = device.employeeId;

      this.employeeService.removeDeviceFromEmployee(employeeId, this.deviceId).subscribe(() => {
        this.closeDialog();
      });
    })
  }
}
