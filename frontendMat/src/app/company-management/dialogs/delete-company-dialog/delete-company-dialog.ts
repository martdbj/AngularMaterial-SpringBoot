import { Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-delete-company-dialog',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle],
  templateUrl: './delete-company-dialog.html',
  styleUrl: './delete-company-dialog.css',
})
export class DeleteCompanyDialog {

  companyService = inject(CompanyService);

  data = inject(MAT_DIALOG_DATA);
  companyId: string = this.data;

  private dialog = inject(MatDialogRef<DeleteCompanyDialog>);

  closeDialog() {
    this.dialog.close(true);
  }

  deleteOnSubmit() {
    this.companyService.deleteCompanyById(this.companyId).subscribe(() => {
      this.dialog.close(true);
      this.closeDialog();
    });
  }
}
