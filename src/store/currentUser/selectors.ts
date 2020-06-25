import AppState from "../state-model";

export const getCurrentUserSelector = (state: AppState) => state.currentUser;
export const getUserSelector = (state: AppState) => getCurrentUserSelector(state).user;