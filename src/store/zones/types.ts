import { Zone } from "../../global/models/zone-models";
import { Action } from "redux";
import { UserZonesActionTypes } from "./actions";

export interface UserZonesState {
  isFetching: boolean;
  isPosting: boolean;
  lastFetch: Date | null;
  lastPost: Date | null;
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

export interface AddZoneRequest
  extends Action<UserZonesActionTypes.ADDZONE_REQUEST> {}

export interface AddZoneSuccess
  extends Action<UserZonesActionTypes.ADDZONE_SUCCESS> {
  payload: string;
}

export interface AddZoneFailure
  extends Action<UserZonesActionTypes.ADDZONE_FAILURE> {}

export interface GetUserZoneRequest
  extends Action<UserZonesActionTypes.GETUSERZONE_REQUEST> {}

export interface GetUserZoneSuccess
  extends Action<UserZonesActionTypes.GETUSERZONE_SUCCESS> {
  payload: Zone;
}

export interface GetUserZoneCanceled
  extends Action<UserZonesActionTypes.GETUSERZONE_CANCELED> {}

export interface GetUserZoneFailure
  extends Action<UserZonesActionTypes.GETUSERZONE_FAILURE> {}

export type UserZonesActions =
  | GetUserZoneRequest
  | GetUserZoneSuccess
  | GetUserZoneCanceled
  | GetUserZoneFailure
  | GetUserZonesRequest
  | GetUserZonesSuccess
  | GetUserZonesCanceled
  | GetUserZonesFailure
  | AddZoneRequest
  | AddZoneSuccess
  | AddZoneFailure;
