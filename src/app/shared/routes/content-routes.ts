import { Routes } from '@angular/router';

export const content: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    
    {
        path: 'masters',
        loadChildren: () => import('../../components/master/master.module').then(m => m.MasterModule),
    },
   
];