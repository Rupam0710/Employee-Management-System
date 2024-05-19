import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
// import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpService } from '../services/http.service';
import { EmployeeResolver } from './store/employee.resolver';
import { EmployeeEffects } from './store/effect/employee.effect';
import { employeeReducer } from './store/reducer/employee.reducers';



export const coursesRoutes: Routes = [
  
];


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    // MatMomentDateModule,
    ReactiveFormsModule,
    // RouterModule.forChild(coursesRoutes),
    EffectsModule.forFeature([EmployeeEffects]),
    StoreModule.forFeature("employees", employeeReducer)
  ],
  declarations: [
    EmployeeFormComponent,
    EmployeeListComponent,
  ],
  exports: [
    EmployeeFormComponent,
    EmployeeListComponent,
  ],
  providers: [
    HttpService,
    EmployeeResolver,
  ]
})
export class EmployeeModule {

  constructor() {

  }


}
