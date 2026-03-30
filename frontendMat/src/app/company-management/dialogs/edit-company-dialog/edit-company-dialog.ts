import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Company } from '../../../models/company';
import { CompanyService } from '../../../services/company.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'edit-company-dialog',
  templateUrl: 'edit-company-dialog.html',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogContent, MatDialogTitle, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCompanyDialog {

  companyService = inject(CompanyService);

  data = inject(MAT_DIALOG_DATA);
  companyId: string = this.data;

  private dialog = inject(MatDialogRef<EditCompanyDialog>);

  editCompanyModel = signal<Company>({
    id: '',
    name: '',
    employees: []
  });

  clearEditCompanyModel: Company = {
    id: '',
    name: '',
    employees: []
  };


  ngOnInit(): void {
    this.companyService.getCompanyById(this.companyId).subscribe(company => {
      this.editCompanyModel.set({
        id: company.id,
        name: company.name,
        employees: company.employees
      });
    });
  }

  updateForm = form(this.editCompanyModel, (fieldPath) => {
    required(fieldPath.name, { message: 'Name is required' });
  });

  closeDialog() {
    this.dialog.close(true);
  }

  updateOnSubmit(event: Event) {
    event.preventDefault();

    submit(this.updateForm, async () => {

      const updatedName = this.updateForm.name().value();

      const companyData = this.editCompanyModel();
      companyData.name = updatedName;

      this.companyService.updateCompanyById(this.companyId, companyData).subscribe(() => {
        this.closeDialog();
        this.editCompanyModel.set(this.clearEditCompanyModel);
      });
    });
  }
}

