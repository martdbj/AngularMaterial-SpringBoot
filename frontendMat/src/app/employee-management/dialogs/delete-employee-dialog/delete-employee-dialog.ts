import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-employee-dialog',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle],
  templateUrl: './delete-employee-dialog.html',
  styleUrl: './delete-employee-dialog.css',
})
export class DeleteEmployeeDialog {

  employeeService = inject(EmployeeService);

  data = inject(MAT_DIALOG_DATA);
  employeeId: string = this.data;

  private dialog = inject(MatDialogRef<DeleteEmployeeDialog>);

  closeDialog() {
    this.dialog.close(true);
  }

  deleteOnSubmit() {
    this.employeeService.deleteEmployeeById(this.employeeId).subscribe(() => {
      this.dialog.close(true);
      this.closeDialog();
    });
  }

}
