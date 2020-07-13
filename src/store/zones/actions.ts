import { Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";

import AppState from "../state-model";
import {
  GetUserZonesCanceled,
  GetUserZonesRequest,
  GetUserZonesFailure,
  GetUserZonesSuccess,
  AddZoneFailure,
  AddZoneSuccess,
  AddZoneRequest,
  GetUserZoneRequest,
  GetUserZoneFailure,
  GetUserZoneSuccess,
} from "./types";
import { getCurrentUserSelector } from "../currentUser/selectors";
import { ZoneResponse, AddZone } from "../../global/models/zone-models";
import { getUserZonesSelector } from "./selectors";
import { getOldDate } from "../../global/helpers";

export enum UserZonesActionTypes {
  GETUSERZONE_REQUEST = "@@zones/GETUSERZONE_REQUEST",
  GETUSERZONE_FAILURE = "@@zones/GETUSERZONE_FAILURE",
  GETUSERZONE_SUCCESS = "@@zones/GETUSERZONE_SUCCESS",
  GETUSERZONE_CANCELED = "@@zones/GETUSERZONE_CANCELED",

  GETUSERZONES_REQUEST = "@@zones/GETUSERZONES_REQUEST",
  GETUSERZONES_FAILURE = "@@zones/GETUSERZONES_FAILURE",
  GETUSERZONES_SUCCESS = "@@zones/GETUSERZONES_SUCCESS",
  GETUSERZONES_CANCELED = "@@zones/GETUSERZONES_CANCELED",

  ADDZONE_REQUEST = "@@zones/ADDZONE_REQUEST",
  ADDZONE_FAILURE = "@@zones/ADDZONE_FAILURE",
  ADDZONE_SUCCESS = "@@zones/ADDZONE_SUCCESS",
}

export const userZoneActions = {
  getUserZone: (zoneId: string) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({
      type: UserZonesActionTypes.GETUSERZONE_REQUEST,
    } as GetUserZoneRequest);

    try {
      const response = (await axios.get(`zones/${zoneId}`)) as AxiosResponse<
        ZoneResponse
      >;

      dispatch({
        type: UserZonesActionTypes.GETUSERZONE_SUCCESS,
        payload: response.data,
      } as GetUserZoneSuccess);
    } catch (error) {
      dispatch({
        type: UserZonesActionTypes.GETUSERZONE_FAILURE,
      } as GetUserZoneFailure);
    }
  },
  getUserZones: async (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();
    const currentUser = getCurrentUserSelector(state);
    const userZones = getUserZonesSelector(state);

    const date = getOldDate(5);

    if (
      !currentUser.isLoggedIn ||
      (userZones && userZones.lastFetch && userZones.lastFetch > date)
    ) {
      return dispatch({
        type: UserZonesActionTypes.GETUSERZONES_CANCELED,
      } as GetUserZonesCanceled);
    }

    dispatch({
      type: UserZonesActionTypes.GETUSERZONES_REQUEST,
    } as GetUserZonesRequest);

    try {
      const response = (await axios.get(`zones`, {
        params: { userId: currentUser.user.id },
      })) as AxiosResponse<ZoneResponse[]>;
      const data = response.data;

      dispatch({
        type: UserZonesActionTypes.GETUSERZONES_SUCCESS,
        payload: data,
      } as GetUserZonesSuccess);
    } catch (error) {
      dispatch({
        type: UserZonesActionTypes.GETUSERZONES_FAILURE,
      } as GetUserZonesFailure);
    }
  },
  addZone: (payload: AddZone) => async (
    dispatch: Dispatch<any>,
    getState: () => AppState
  ) => {
    dispatch({
      type: UserZonesActionTypes.ADDZONE_REQUEST,
    } as AddZoneRequest);

    try {
      const response = (await axios.post("zones", payload)) as AxiosResponse<
        string
      >;

      const zoneId = response.data;

      dispatch({
        type: UserZonesActionTypes.ADDZONE_SUCCESS,
        payload: zoneId,
      } as AddZoneSuccess);

      dispatch(userZoneActions.getUserZone(zoneId));
    } catch (error) {
      dispatch({
        type: UserZonesActionTypes.ADDZONE_FAILURE,
      } as AddZoneFailure);
    }
  },
};
