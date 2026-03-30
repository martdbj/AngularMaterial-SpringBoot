import { Component, computed, inject, signal } from '@angular/core';

import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';
import { Employee } from '../models/employee';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyDialog } from './dialogs/add-company-dialog/add-company-dialog';
import { EditCompanyDialog } from './dialogs/edit-company-dialog/edit-company-dialog';
import { DeleteCompanyDialog } from './dialogs/delete-company-dialog/delete-company-dialog';
import { EmployeeService } from '../services/employee.service';



@Component({
  selector: 'app-company-management',
  imports: [
    MatCardModule, MatButtonModule,
    MatIconModule, MatMenuModule
],
  templateUrl: './company-management.html',
  styleUrl: './company-management.css',
})
export class CompanyManagement {
  companyService = inject(CompanyService);
  employeeService = inject(EmployeeService);

  companies = signal<Company[]>([]);
  employees = signal<Employee[]>([]);

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies.set(data);
    });
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees.set(employees);
    })
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  getEmployeeNumber(companyId: string): number {
    // THis code could be improve adding a method in spring boot for getting employees by companyId
    let count = 0;
    for (let employee of this.employees()) {
      if (employee.companyId == companyId) count++;
    }
    return count;
  }

  // Dialogs
  readonly dialog = inject(MatDialog);

  openAddCompanyDialog() {
    const addDialog = this.dialog.open(AddCompanyDialog, {disableClose: true});

    addDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadCompanies();
      }
    });
  }

  openEditCompanyDialog(id: string) {
    const editDialog = this.dialog.open(EditCompanyDialog, {disableClose: true, data: id});

    editDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadCompanies();
      }
    });
  }

  openDeleteCompanyDialog(id: string) {
    const deleteDialog = this.dialog.open(DeleteCompanyDialog, {disableClose: true, data: id});

    deleteDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadCompanies();
      }
    });
  }
}





