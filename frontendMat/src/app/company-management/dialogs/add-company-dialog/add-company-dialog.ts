import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company';
import { form, required, submit } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'add-company-dialog',
  templateUrl: 'add-company-dialog.html',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCompanyDialog {

  companyService = inject(CompanyService);

  private dialog = inject(MatDialogRef<AddCompanyDialog>);

  addCompanyModel = signal<Company>({
    id: '',
    name: '',
    employees: []
  });

  clearAddCompanyModel: Company = {
    id: '',
    name: '',
    employees: []
  };

  addForm = form(this.addCompanyModel, (fieldPath) => {
    required(fieldPath.name, { message: 'Name is required' });
  });

  closeDialog() {
    this.dialog.close(true);
  }

  addOnSubmit(event: Event) {
    event.preventDefault();

    submit(this.addForm, async () => {
      const companyName = this.addForm.name().value();
      const newCompany: Company = {
        id: '',
        name: companyName,
        employees: []
      };

      this.companyService.addNewCompany(newCompany).subscribe(() => {
        this.addCompanyModel.set(this.clearAddCompanyModel);
        this.closeDialog();
      })
    })
  };
}
