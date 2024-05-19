import { state } from "@angular/animations";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers";


export const selectAuthState =createFeatureSelector<AuthState>("auth")


export const isLoggedIn = createSelector(
    // state => state["auth"],
    selectAuthState,
    (auth) =>!!auth.email,
    
);


export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn) =>!loggedIn,
);

