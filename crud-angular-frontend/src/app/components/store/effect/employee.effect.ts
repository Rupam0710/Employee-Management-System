import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpService } from "src/app/services/http.service";
import { AllEmployeesLoaded } from "../action/employee.action";
import { concatMap, map } from "rxjs";
import { EmployeeActions } from "../action/action-types";
import { IEmployee } from "src/app/interfaces/employee";


@Injectable()

export class EmployeeEffects {
   
    loadEmployeeList$ = createEffect(()=>
        
    this.actions$.pipe(
        ofType(EmployeeActions.loadAllEmployees),
        concatMap(action =>
            this.httpService.getAllEmployee()),
            map(employees=> AllEmployeesLoaded({employees}))
    )
        
    );

    saveEmployeeList$ = createEffect(()=>
     this.actions$.pipe(
        ofType(EmployeeActions.EmployeeUpdated),
        concatMap(action =>
            this.httpService.updateEmployee(
                +action.update.id,
                action.update.changes
                // {
                //     ...action.update.changes,
                //      name: action.update.changes.name || '',
                //    } as IEmployee,
            )
        )
     ),
     {dispatch: false}
    )


  

    constructor(private actions$: Actions,
        private httpService : HttpService){}
}