import { createAction, props } from "@ngrx/store";
import { Employee } from "../../model/employee";
import { IEmployee } from "src/app/interfaces/employee";
import { Update } from "@ngrx/entity";

export const loadAllEmployees = createAction(
    "[Courses Resolver] load All Employees"
);

export const AllEmployeesLoaded = createAction(
    "[Load Employees Effect] All Employees Loaded",
    props<{employees: IEmployee[]}>()
);

export const EmployeeUpdated = createAction(
    "[Edit Employees Form] Employee Updated",
    props<{update: Update<IEmployee>}>()
);