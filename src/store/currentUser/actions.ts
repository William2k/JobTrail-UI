import Axios, { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import { Dispatch } from "redux";

import {
  SignIn,
  SignUp,
  UserResponseWithToken,
  UserResponse
} from "../../global/models/user-models";
import AppState from "../state-model";
import {
  GetUserCanceled,
  SignInRequest,
  SignInSuccess,
  SignInFailure,
  SignOutSuccess,
  SignUpFailure,
  SignUpPasswordFailure,
  SignUpRequest,
  SignUpSuccess
} from "./types";

export enum CurrentUserActionTypes {
  SIGNUP_REQUEST = "[SignUp] SignUp Request",
  SIGNUP_PASSWORD_FAILURE = "[SignUp] SignUp Password Failure",
  SIGNUP_FAILURE = "[SignUp] SignUp Failure",
  SIGNUP_SUCCESS = "[SignUp] SignUp Success",

  SIGNIN_REQUEST = "[SignIn] SignIn Request",
  SIGNIN_FAILURE = "[SignIn] SignIn Failure",
  SIGNIN_SUCCESS = "[SignIn] SignIn Success",

  SIGNOUT_REQUEST = "[SignOut] SignOut Request",
  SIGNOUT_SUCCESS = "[SignOut] SignOut Success",
  AUTHENTICATION_FAILED = "[Authentication] Authentication Failed",

  GETUSER_REQUEST = "[GetUser] GetUser Request",
  GETUSER_FAILURE = "[GetUser] GetUser Failure",
  GETUSER_SUCCESS = "[GetUser] GetUser Success",
  GETUSER_CANCELED = "[GetUser] GetUser Cancel",
}

export const currentUserActions = {
  getUser: () => async (dispatch: Dispatch, getState: () => AppState) => {
    const token = localStorage.getItem("JwtToken");

    if (!token) {
      return dispatch({
        type: CurrentUserActionTypes.GETUSER_CANCELED
      } as GetUserCanceled);
    }

    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    dispatch({ type: CurrentUserActionTypes.SIGNIN_REQUEST } as SignInRequest);

    try {
      const response = (await Axios.get(
        "account/authenticate"
      )) as AxiosResponse<UserResponse>;
      const data = response.data;
      dispatch({
        type: CurrentUserActionTypes.SIGNIN_SUCCESS,
        payload: data
      } as SignInSuccess);
    } catch (error) {
      Axios.defaults.headers.common.Authorization = null;

      dispatch({
        type: CurrentUserActionTypes.SIGNIN_FAILURE
      } as SignInFailure);
    }
  },
  signInUser: (payload: SignIn) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({ type: CurrentUserActionTypes.SIGNIN_REQUEST } as SignInRequest);

    try {
      const response = (await Axios.post(
        "account/signin",
        payload
      )) as AxiosResponse<UserResponseWithToken>;
      const data = response.data;

      localStorage.setItem("JwtToken", data.token);
      Axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      dispatch({
        type: CurrentUserActionTypes.SIGNIN_SUCCESS,
        payload: data.user
      } as SignInSuccess);
    } catch (error) {
      dispatch({
        type: CurrentUserActionTypes.SIGNIN_FAILURE
      } as SignInFailure);
    }
  },
  signOutUser: () => (dispatch: Dispatch, getState: () => AppState) => {
    localStorage.removeItem("JwtToken");
    Axios.defaults.headers.common.Authorization = null;
    dispatch({
      type: CurrentUserActionTypes.SIGNOUT_SUCCESS
    } as SignOutSuccess);
    dispatch(push("/"));
  },
  signUpUser: (payload: SignUp) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    if (payload.password !== payload.confirmPassword) {
      // will add a validator function to validate the password for complexity
      return dispatch({
        type: CurrentUserActionTypes.SIGNUP_PASSWORD_FAILURE
      } as SignUpPasswordFailure);
    }

    delete payload.confirmPassword;

    dispatch({ type: CurrentUserActionTypes.SIGNUP_REQUEST } as SignUpRequest);

    try {
      await Axios.post("account/signup", payload);

      dispatch({
        type: CurrentUserActionTypes.SIGNUP_SUCCESS
      } as SignUpSuccess);
    } catch (error) {
      dispatch({
        type: CurrentUserActionTypes.SIGNUP_FAILURE
      } as SignUpFailure);
    }
  }
};