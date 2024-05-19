import { createAction, props } from "@ngrx/store";
import { User } from "src/app/auth/model/user.model";

export const login  = createAction(
  "[Login Component] User Login",
  props<{email:string,password:string}>()
)

export const logout  = createAction(
  "[Top Menu] User Logout",
  
)
