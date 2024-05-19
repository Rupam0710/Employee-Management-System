import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from 'src/app/auth/model/user.model';
import { AuthActions } from '../actions/action-types';



export interface AuthState {
//   user:User,
  email:string,
  password:string,
}

export const initialAuthState : AuthState = {
    email: undefined,
    password: undefined
}



export const authReducer = createReducer(
    initialAuthState,

    on(AuthActions.login,(state,action)=>{
        return {
            email : action.email,
            password : action.password,
        }
    }),

    on(AuthActions.logout,(state,action)=>{
        return {
            email : undefined,
            password : undefined,
        }
    })
)