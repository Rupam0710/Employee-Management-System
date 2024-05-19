import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../actions/action-types";
import { User } from "../app.interface";

export const authFeatureKey = 'auth';

export interface AppState {
  user: User,
  error: any
 }
 
 export const initialState: AppState = {
   user: {
     email: null,
     password:null,
    //  id: null,
    //  username: null,
    //  isadmin: null,
   },
   error: null,
 };
 

   export const reducer = createReducer(
    initialState,
   
   on(AuthActions.loginSuccess, (state, action) => {
     return {
       ...state,
       user: action.user,
       error: null,
     };
   }),
   on(AuthActions.loginFailure, (state, action) => {
     return {
       ...state,
       user: {
         email: null,
         password: null,
         //  id: null,
         //  isadmin: null,
       },
       error: action.error,
     };
   })
   );

   