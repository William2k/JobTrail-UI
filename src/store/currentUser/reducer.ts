import { CurrentUserState, CurrentUserActions } from "./types";
import { CurrentUserActionTypes } from "./actions";

const initialState = {
  isFetching: false,
  isPosting: false,
  isLoggedIn: false,
  loginAttempts: 0,
  user: {
    username: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    roles: [],
    isActive: false
  }
} as CurrentUserState;

export default (
  state = initialState,
  action: CurrentUserActions
): CurrentUserState => {
  switch (action.type) {
    case CurrentUserActionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case CurrentUserActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isFetching: false,
        loginAttempts: state.loginAttempts + 1
      };
    case CurrentUserActionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        loginAttempts: state.loginAttempts + 1
      };
    case CurrentUserActionTypes.AUTHENTICATION_FAILED:
    case CurrentUserActionTypes.SIGNOUT_SUCCESS: {
      return initialState;
    }
    case CurrentUserActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isPosting: true
      };
    case CurrentUserActionTypes.SIGNUP_SUCCESS:
    case CurrentUserActionTypes.SIGNUP_FAILURE:
    case CurrentUserActionTypes.SIGNUP_PASSWORD_FAILURE:
      return {
        ...state,
        isPosting: false
      };
    case CurrentUserActionTypes.GETUSER_CANCELED:
    case CurrentUserActionTypes.GETUSER_FAILURE:
      return {
        ...state,
        isFetching: false,
        loginAttempts: state.loginAttempts + 1
      };
    default:
  }

  return state;
};
