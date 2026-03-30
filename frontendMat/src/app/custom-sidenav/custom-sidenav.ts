import { Component, computed, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MenuItem } from '../models/menuItem';



@Component({
  selector: 'app-custom-sidenav',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './custom-sidenav.html',
  styleUrl: './custom-sidenav.css',
})
export class CustomSidenav {

  collapsed = input<boolean>(false);

  menuItems = signal<MenuItem[]>([
    {
      icon: "apartment",
      label: "Companies",
      route: "companies"
    },
    {
      icon: "group",
      label: "Employees",
      route: "employees"
    },
    {
      icon: "devices",
      label: "Devices",
      route: "devices"
    }
  ]);
}
