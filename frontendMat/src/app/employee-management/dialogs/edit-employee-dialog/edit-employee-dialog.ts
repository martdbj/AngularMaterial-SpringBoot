import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { email, form, FormField, maxLength, minLength, pattern, required, submit } from '@angular/forms/signals';
import { Employee } from '../../../models/employee';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company';

@Component({
  selector: 'app-edit-employee-dialog',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle, FormField, MatSelectModule],
  templateUrl: './edit-employee-dialog.html',
  styleUrl: './edit-employee-dialog.css',
})
export class EditEmployeeDialog {
  employeeService = inject(EmployeeService);
  companyService = inject(CompanyService);

  companies = signal<Company[]>([]);

  data = inject(MAT_DIALOG_DATA);
  employeeId: string = this.data;

  private dialog = inject(MatDialogRef<EditEmployeeDialog>);

  editEmployeeModel = signal<Employee>({
    id: "",
    name: "",
    email: "",
    companyId: "",
    devicesId: []
  })

  clearEmployeeModel = {
    id: "",
    name: "",
    email: "",
    companyId: "",
    devicesId: []
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.editEmployeeModel.set({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        companyId: employee.companyId,
        devicesId: employee.devicesId
      });

      this.companyService.getCompanies().subscribe(data => {
        this.companies.set(data);
      });
    });
  };


  updateForm = form(this.editEmployeeModel, (fieldPath) => {
    maxLength(fieldPath.name, 255, { message: 'Name cannot be longer than 255 characters' });
    minLength(fieldPath.name, 3, { message: 'Name must be at least 3 characters long' });
    pattern(fieldPath.name, /^[a-zA-Z0-9 ]+$/, { message: 'Name cannot contain special characters' });
    required(fieldPath.name, { message: 'Name is required' });
    email(fieldPath.email, { message: 'Enter a valid email address' });
    required(fieldPath.email, { message: 'Email is required' });
    required(fieldPath.companyId, { message: 'Company is required' });
  });

  closeDialog() {
    this.dialog.close(true);
  }

  updateOnSubmit(event: Event) {
    event.preventDefault();

    submit(this.updateForm, async () => {

      const updatedName = this.updateForm.name().value();
      const updateEmail = this.updateForm.email().value();
      const updateCompany = this.updateForm.companyId().value();

      const employeeData = this.editEmployeeModel();
      employeeData.name = updatedName;
      employeeData.email = updateEmail;
      employeeData.companyId = updateCompany;

      this.employeeService.updateEmployeeById(this.employeeId, employeeData).subscribe(() => {
        this.closeDialog();
        this.editEmployeeModel.set(this.clearEmployeeModel);
      });
    });
  }
}
