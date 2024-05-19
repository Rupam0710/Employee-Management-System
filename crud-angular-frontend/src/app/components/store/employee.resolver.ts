import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, filter, finalize, first, tap } from "rxjs";
import { AppState } from "src/app/reducers";
import { loadAllEmployees } from "./action/employee.action";
import { areEmployeesLoaded } from "./selector/employee.selector";


@Injectable()
export class EmployeeResolver implements Resolve<any>{
    loading = false;

    constructor(private store:Store<AppState>){}
    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {
        
            return this.store.pipe(
                select(areEmployeesLoaded),
                tap(()=> {
                    if(!this.loading){
                        this.loading=true;
                        this.store.dispatch(loadAllEmployees())
                    }
                }),
                filter(employeesLoaded => employeesLoaded),
                first(),
                finalize(()=> this.loading=false)
            );
    }
}