import { Action } from "redux";

import { User } from "../../global/models/user-models";
import { CurrentUserActionTypes } from "./actions";

export interface CurrentUserState {
  isFetching: boolean;
  isPosting: boolean;
  isLoggedIn: boolean;
  loginAttempts: number;
  user: User;
}

export interface GetUserRequest
  extends Action<CurrentUserActionTypes.GETUSER_REQUEST> {}

export interface GetUserSuccess
  extends Action<CurrentUserActionTypes.GETUSER_SUCCESS> {
  payload: User;
}

export interface GetUserCanceled
  extends Action<CurrentUserActionTypes.GETUSER_CANCELED> {}

export interface GetUserFailure
  extends Action<CurrentUserActionTypes.GETUSER_FAILURE> {}

export interface SignInRequest
  extends Action<CurrentUserActionTypes.SIGNIN_REQUEST> {}

export interface SignInSuccess
  extends Action<CurrentUserActionTypes.SIGNIN_SUCCESS> {
  payload: User;
}

export interface SignInFailure
  extends Action<CurrentUserActionTypes.SIGNIN_FAILURE> {}

export interface SignOutRequest
  extends Action<CurrentUserActionTypes.SIGNOUT_REQUEST> {}

export interface SignOutSuccess
  extends Action<CurrentUserActionTypes.SIGNOUT_SUCCESS> {}

export interface AuthenticationFailed
  extends Action<CurrentUserActionTypes.AUTHENTICATION_FAILED> {}

export interface SignUpRequest
  extends Action<CurrentUserActionTypes.SIGNUP_REQUEST> {}

export interface SignUpSuccess
  extends Action<CurrentUserActionTypes.SIGNUP_SUCCESS> {}

export interface SignUpPasswordFailure
  extends Action<CurrentUserActionTypes.SIGNUP_PASSWORD_FAILURE> {}

export interface SignUpFailure
  extends Action<CurrentUserActionTypes.SIGNUP_FAILURE> {}

export type CurrentUserActions =
  | GetUserRequest
  | GetUserSuccess
  | GetUserCanceled
  | GetUserFailure
  | SignInRequest
  | SignInSuccess
  | SignInFailure
  | SignOutRequest
  | SignOutSuccess
  | AuthenticationFailed
  | SignUpRequest
  | SignUpSuccess
  | SignUpPasswordFailure
  | SignUpFailure;
