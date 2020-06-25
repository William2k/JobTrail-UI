import { Zone } from "../../global/models/zone-models";
import { Action } from "redux";
import { UserZonesActionTypes } from "./actions";

export interface UserZonesState {
  isFetching: boolean;
  lastFetch: Date | null;
  zones: Zone[];
}

export interface GetUserZonesRequest
  extends Action<UserZonesActionTypes.GETUSERZONES_REQUEST> {}

export interface GetUserZonesSuccess
  extends Action<UserZonesActionTypes.GETUSERZONES_SUCCESS> {
  payload: Zone[];
}

export interface GetUserZonesCanceled
  extends Action<UserZonesActionTypes.GETUSERZONES_CANCELED> {}

export interface GetUserZonesFailure
  extends Action<UserZonesActionTypes.GETUSERZONES_FAILURE> {}

export type UserZonesActions =
  | GetUserZonesRequest
  | GetUserZonesSuccess
  | GetUserZonesCanceled
  | GetUserZonesFailure;
