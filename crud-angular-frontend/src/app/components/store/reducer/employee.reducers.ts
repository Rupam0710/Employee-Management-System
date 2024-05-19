import { AllEmployeesLoaded } from './../action/employee.action';
import { IEmployee } from "src/app/interfaces/employee";
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import { createReducer, on } from "@ngrx/store";
import { EmployeeActions } from "../action/action-types";

export interface EmployeeState extends EntityState<IEmployee>{
  allEmployeesLoaded : boolean;
}

export const adapter = createEntityAdapter<IEmployee>();

export const initialEmployeeState= adapter.getInitialState({
    allEmployeesLoaded:false
});


export const employeeReducer = createReducer(
   
    initialEmployeeState ,

    on(EmployeeActions.AllEmployeesLoaded,
        (state,action)=> adapter.addMany(action.employees,
            {...state,
                allEmployeesLoaded:true
            })),

    on(EmployeeActions.EmployeeUpdated,(state,action)=>
    adapter.updateOne(action.update,state)),
);

export const {selectAll} = adapter.getSelectors();