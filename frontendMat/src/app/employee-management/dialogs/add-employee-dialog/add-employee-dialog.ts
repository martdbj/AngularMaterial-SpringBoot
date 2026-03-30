import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { CompanyService } from '../../../services/company.service';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Employee } from '../../../models/employee';
import { email, form, FormField, maxLength, minLength, pattern, required, submit } from '@angular/forms/signals';
import { Device } from '../../../models/device';
import { Company } from '../../../models/company';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-add-employee-dialog',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle, FormField, MatSelectModule],
  templateUrl: './add-employee-dialog.html',
  styleUrl: './add-employee-dialog.css',
})
export class AddEmployeeDialog {

  companyService = inject(CompanyService);
  employeeService = inject(EmployeeService);

  devices = signal<Device[]>([]);
  employees = signal<Employee[]>([]);
  companies = signal<Company[]>([]);

  private dialog = inject(MatDialogRef<AddEmployeeDialog>);

  addEmployeeModel = signal<Employee>({
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
    this.companyService.getCompanies().subscribe(data => {
      this.companies.set(data);
    });

    this.employeeService.getEmployees().subscribe(data => {
      this.employees.set(data);
    });
    // this.deviceService.getDevices().subscribe(data => {
    //   this.devices.set(data);
    // });
  }

  addForm = form(this.addEmployeeModel, (fieldPath) => {
    maxLength(fieldPath.name, 255, { message: 'Name cannot be longer than 255 characters' });
    minLength(fieldPath.name, 3, { message: 'Name must be at least 3 characters long' });
    pattern(fieldPath.name, /^[a-zA-Z0-9 ]+$/, { message: 'Name cannot contain special characters' });
    required(fieldPath.name, { message: 'Name is required' });
    email(fieldPath.email, { message: 'Enter a valid email address' });
    required(fieldPath.email, { message: 'Email is required' });
    required(fieldPath.companyId, { message: 'Company is required'});
  })

  closeDialog() {
    this.dialog.close(true);
  }

  addOnSubmit(event: Event) {
    event.preventDefault();
    submit(this.addForm, async () => {
      const employeeEmail = this.addForm.email().value();
      const employeeName = this.addForm.name().value();
      const companyId = this.addForm.companyId().value();

      let newEmployee: Employee = {
        id: "",
        email: employeeEmail,
        name: employeeName,
        companyId: companyId,
        devicesId: []
      }

      this.employeeService.addNewEmployee(newEmployee).subscribe(() => {
        this.addEmployeeModel.set(this.clearEmployeeModel);
        this.closeDialog();
      });
    })
  };
}
