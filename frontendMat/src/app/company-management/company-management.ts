import { Component, inject, signal } from '@angular/core';

import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyDialog } from './dialogs/add-company-dialog/add-company-dialog';
import { EditCompanyDialog } from './dialogs/edit-company-dialog/edit-company-dialog';
import { DeleteCompanyDialog } from './dialogs/delete-company-dialog/delete-company-dialog';



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

  companies = signal<Company[]>([]);

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies.set(data);
    });
  }

  ngOnInit(): void {
    this.loadCompanies();
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





