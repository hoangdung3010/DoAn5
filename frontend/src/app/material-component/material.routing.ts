import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageDepartmentComponent } from './manage-department/manage-department.component';
import { RouteGuardService } from '../services/route-guard.service';



export const MaterialRoutes: Routes = [
    {
        path:'department',
        component:ManageDepartmentComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    }
];
