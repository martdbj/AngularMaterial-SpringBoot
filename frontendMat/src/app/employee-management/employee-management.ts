import { Component, inject, signal } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { EmployeeService } from '../services/employee.service';
import { Company } from '../models/company';
import { Employee } from '../models/employee';
import { DeviceService } from '../services/device.service';
import { AddEmployeeDialog } from './dialogs/add-employee-dialog/add-employee-dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCompanyDialog } from '../company-management/dialogs/delete-company-dialog/delete-company-dialog';
import { DeleteEmployeeDialog } from './dialogs/delete-employee-dialog/delete-employee-dialog';
import { EditEmployeeDialog } from './dialogs/edit-employee-dialog/edit-employee-dialog';

@Component({
  selector: 'app-employee-management',
  imports: [
    MatCardModule, MatButtonModule,
    MatIconModule, MatMenuModule,
  ],
  templateUrl: './employee-management.html',
  styleUrl: './employee-management.css',
})
export class EmployeeManagement {
  constructor(
    private breakpointObserver: BreakpointObserver) { }

  employeeService = inject(EmployeeService);
  companyService = inject(CompanyService);
  deviceService = inject(DeviceService)

  companies = signal<Company[]>([]);
  employees = signal<Employee[]>([]);

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 500px)');
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies.set(data);
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees.set(data);
    })
  }

  loadData(): void {
    this.loadCompanies();
    this.loadEmployees();
  }

  ngOnInit(): void {
    this.loadData();
  }

  getCompanyNameFromId(id: string): string {
    const company = this.companies().find(company => company.id  == id);
    if (company) return company.name;
    return 'Company not found';
  }

  // Dialogs
  readonly dialog = inject(MatDialog);

  openAddCompanyDialog() {
    const addDialog = this.dialog.open(AddEmployeeDialog, { disableClose: true });

    addDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadData();
      }
    });
  }

  openEditEmployeeDialog(id: string) {
    const editDialog = this.dialog.open(EditEmployeeDialog, {disableClose: true, data: id});

    editDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadData();
      }
    });
  }

  openDeleteEmployeeDialog(id: string) {
    const deleteDialog = this.dialog.open(DeleteEmployeeDialog, {disableClose: true, data: id});

    deleteDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadData();
      }
    });
  }
}
