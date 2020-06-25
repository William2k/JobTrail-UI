import { UserZonesState, UserZonesActions } from "./types";
import { UserZonesActionTypes } from "./actions";

const initialState = {
  isFetching: false,
  lastFetch: null,
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
    default:
      return state;
  }
};
