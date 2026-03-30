import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceService } from '../services/device.service';
import { Device } from '../models/device';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AddDeviceDialog } from './dialogs/add-device-dialog/add-device-dialog';
import { DeleteDeviceDialog } from './dialogs/delete-device-dialog/delete-device-dialog';
import { EditDeviceDialog } from './dialogs/edit-device-dialog/edit-device-dialog';
import { AssignDeviceDialog } from './dialogs/assign-device-dialog/assign-device-dialog';
import { AssignButton } from "./buttons/assign-button/assign-button";
import { UnassignDeviceDialog } from './dialogs/unassign-device-dialog/unassign-device-dialog';

@Component({
  selector: 'app-device-management',
  imports: [
    MatCardModule, MatButtonModule,
    MatIconModule, MatMenuModule,
    AssignButton
],
  templateUrl: './device-management.html',
  styleUrl: './device-management.css',
})
export class DeviceManagement {

  deviceService = inject(DeviceService);

  devices = signal<Device[]>([]);

  loadDevices(): void {
    this.deviceService.getDevices().subscribe(data => {
      this.devices.set(data);
    });
  }

  ngOnInit(): void {
    this.loadDevices();
  }

  // Dialogs
  readonly dialog = inject(MatDialog);

  openAddDeviceDialog() {
    const addDialog = this.dialog.open(AddDeviceDialog, {disableClose: true});

    addDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadDevices();
      }
    });
  }

  openEditDeviceDialog(id: string) {
    const editDialog = this.dialog.open(EditDeviceDialog, {disableClose: true, data: id});

    editDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadDevices();
      }
    });
  }

  openDeleteDeviceDialog(id: string) {
    const deleteDialog = this.dialog.open(DeleteDeviceDialog, {disableClose: true, data: id});

    deleteDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadDevices();
      }
    });
  }

  selectAssignDeviceDialog(id: string) {
    this.deviceService.getDeviceBySerialNumber(id).subscribe(device => {
      if (device.employeeId === "") {
        this.openAssignDeviceDIalog(id);
      } else {
        this.openUnassignDeviceDIalog(id);
      }
    })
  }

  openAssignDeviceDIalog(id: string) {
    const deleteDialog = this.dialog.open(AssignDeviceDialog, {disableClose: true, data: id});

    deleteDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadDevices();
      }
    });
  }

  openUnassignDeviceDIalog(id: string) {
    const deleteDialog = this.dialog.open(UnassignDeviceDialog, {disableClose: true, data: id});

    deleteDialog.afterClosed().subscribe(closed => {
      if (closed) {
        this.loadDevices();
      }
    });
  }
}
