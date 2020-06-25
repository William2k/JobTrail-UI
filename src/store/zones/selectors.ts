import AppState from "../state-model";

export const getUserZonesSelector = (state: AppState) => state.userZones;
export const getZonesSelector = (state: AppState) => getUserZonesSelector(state).zones;