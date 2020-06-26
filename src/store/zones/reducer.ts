import { UserZonesState, UserZonesActions } from "./types";
import { UserZonesActionTypes } from "./actions";

const initialState = {
  isFetching: false,
  isPosting: false,
  lastFetch: null,
  lastPost: null,
  zones: [],
} as UserZonesState;

export default (
  state = initialState,
  action: UserZonesActions
): UserZonesState => {
  switch (action.type) {
    case UserZonesActionTypes.GETUSERZONES_REQUEST:
      return { ...state, isFetching: true };
    case UserZonesActionTypes.GETUSERZONES_SUCCESS:
      return {
        ...state,
        zones: action.payload,
        isFetching: false,
        lastFetch: new Date(),
      };
    case UserZonesActionTypes.GETUSERZONES_CANCELED:
    case UserZonesActionTypes.GETUSERZONES_FAILURE:
      return { ...state, isFetching: false };
    case UserZonesActionTypes.ADDZONE_REQUEST:
      return { ...state, isPosting: true };
    case UserZonesActionTypes.ADDZONE_SUCCESS:
      return { ...state, isPosting: false, lastPost: new Date() };
    case UserZonesActionTypes.ADDZONE_FAILURE:
      return { ...state, isPosting: false };
    default:
      return state;
  }
};
