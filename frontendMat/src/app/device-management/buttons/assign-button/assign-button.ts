import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-assign-button',
  imports: [MatCardModule, MatButtonModule,
    MatIconModule, MatMenuModule],
  templateUrl: './assign-button.html',
  styleUrl: './assign-button.css',
})
export class AssignButton {

  employeeId = input();
  buttonMethod = input();

  onAssign = output()

  checkDeviceStatus() {
    const id = this.employeeId();

    if (id === null || id === undefined || id.toString() === "") {
      return true;
    }
    return false;
  }

  buttonColor() {
    return this.checkDeviceStatus() ? "green" : "red";
  }

  buttonText() {
    return this.checkDeviceStatus() ? "Assign" : "Unassing";
  }

  clickedButton() {
    this.onAssign.emit();
  }
}
