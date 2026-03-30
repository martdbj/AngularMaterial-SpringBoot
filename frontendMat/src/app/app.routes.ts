import { Routes } from '@angular/router';
import { CompanyManagement } from './company-management/company-management';
import { EmployeeManagement } from './employee-management/employee-management';
import { DeviceManagement } from './device-management/device-management';

export const routes: Routes = [
    {
        path: 'companies', 
        component: CompanyManagement
    },
    {
        path: 'employees',
        component: EmployeeManagement
    },
    {
        path: 'devices',
        component: DeviceManagement
    },
    {
        path: '',
        component: CompanyManagement
    }
];
