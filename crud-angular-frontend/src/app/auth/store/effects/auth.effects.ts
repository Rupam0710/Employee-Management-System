import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthActions } from "../actions/action-types";



@Injectable()
export class AuthEffects{

    login$ = createEffect(()=>
    this.actions$.pipe(
       ofType(AuthActions.login),
       tap(action => {
           localStorage.setItem('User Email', JSON.stringify(action.email));
           localStorage.setItem('User Password', JSON.stringify(action.password));
           this.router.navigateByUrl('/employee-list');
       })
  ),
  {dispatch:false}
  );

    logout$ = createEffect(()=>
    this.actions$.pipe(
       ofType(AuthActions.logout),
       tap(action => {
           localStorage.removeItem('User Email');
           localStorage.removeItem('User Password');
           this.router.navigate(['/login']);
       })
  ),
  {dispatch:false}
  );
    constructor(private actions$: Actions,private router:Router){
         
    }
}


