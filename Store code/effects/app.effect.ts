import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "../actions/action-types";
import { HttpService } from "src/app/services/http.service";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects { 
login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginPage),
      concatMap((action) =>
        this.httpService.login(action.email, action.password).pipe(
          map((user) => AuthActions.loginSuccess({ user: user })),
        //   tap((action)=>{
        //     localStorage.setItem('token', action.token)
        //     this.router.navigate(['/']);
    
        //   }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      ),
      
    );
  },
  {dispatch:false});

  constructor(private actions$: Actions, private httpService: HttpService,private router:Router) {}

}