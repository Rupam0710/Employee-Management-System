import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { filter, take, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthState } from "./store/reducers";
import { isLoggedIn } from "./store/selectors/auth.selector";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private store:Store<AuthState>,private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
          select(isLoggedIn),
          tap((loggedIn) => {
            if (!loggedIn) {
              this.router.navigate(["/login"]);
            }
          })
        );
      }

 
    }
