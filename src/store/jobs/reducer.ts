import { JobsState, JobsActions } from "./types";
import { JobsActionTypes } from "./actions";

const initialState = {
  current: new Map(),
} as JobsState;

export default (state = initialState, action: JobsActions): JobsState => {
  switch (action.type) {
    case JobsActionTypes.GETJOB_SUCCESS:
    case JobsActionTypes.GETJOBS_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
