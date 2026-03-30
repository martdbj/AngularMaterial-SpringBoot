import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { AssignEmployee } from '../../../models/assignDevice';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Employee } from '../../../models/employee';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DeviceService } from '../../../services/device.service';
import { Device } from '../../../models/device';

@Component({
  selector: 'app-assign-device-dialog',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle, FormField, MatSelectModule],
  templateUrl: './assign-device-dialog.html',
  styleUrl: './assign-device-dialog.css',
})
export class AssignDeviceDialog {

  employeeService = inject(EmployeeService);
  deviceService = inject(DeviceService);

  employees = signal<Employee[]>([]);

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees.set(data);
    });
  }


  ngOnInit(): void {
    this.loadEmployees();
  }

  private dialog = inject(MatDialogRef<AssignDeviceDialog>);

  data = inject(MAT_DIALOG_DATA);
  deviceId: string = this.data;

  checkDeviceStatus() {
    let employeeId: string = "";
    this.deviceService.getDeviceBySerialNumber(this.deviceId).subscribe(device => {
      employeeId = device.employeeId;

      if (employeeId != "") {
        return true;
      }
      return false;
    });
  }

  assignDeviceToEmployeeModel = signal<AssignEmployee>({
    id: ''
  })

  clearAssignModel = {
    id: ''
  }

  assignForm = form(this.assignDeviceToEmployeeModel, (fieldPath) => {
    required(fieldPath.id, { message: "Id is mandatory " })
  })

  closeDialog() {
    this.dialog.close(true);
  }

  assignOnSubmit(event: Event) {
    event.preventDefault();

    submit(this.assignForm, async () => {
      const employeeId = this.assignForm.id().value();

      this.employeeService.addDeviceToEmployee(employeeId, this.deviceId).subscribe(() => {
        this.assignDeviceToEmployeeModel.set(this.clearAssignModel);
        this.closeDialog();
      })
    })
  };
}
