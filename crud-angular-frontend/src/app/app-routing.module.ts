
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { EmployeeResolver } from './components/store/employee.resolver';

export const routes: Routes = [
  // {
  //   path:"employee",
  //   loadChildren: () => import('./components/employee.module').then(m => m.EmployeeModule),
  //   
  // },
  {
    path:"login",
    component:LoginComponent,
    
  },
  {
    path:"",
    component:LoginComponent,
    
  },
  {
    path:'employee-list',
    component:EmployeeListComponent,
    canActivate: [AuthGuard],
    
    resolve:{
      employees: EmployeeResolver
    }
  },
  {
    path:"create-employee",
    component:EmployeeFormComponent,
    canActivate: [AuthGuard],
    
  },
  {
    path:"employee/:id",
    component:EmployeeFormComponent,
    canActivate: [AuthGuard],
    
  },
  {
    path: '**',
    redirectTo: '/'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
