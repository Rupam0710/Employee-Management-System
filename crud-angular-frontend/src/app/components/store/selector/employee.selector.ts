
import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeState } from "../reducer/employee.reducers";


import * as fromEmployee from '../reducer/employee.reducers'

export const selectEmployeeState = createFeatureSelector<EmployeeState>("employees");

export const selectAllEmployees = createSelector(
    selectEmployeeState,
    fromEmployee.selectAll
    
);

export const areEmployeesLoaded = createSelector(
    selectEmployeeState,
    state => state.allEmployeesLoaded
)

