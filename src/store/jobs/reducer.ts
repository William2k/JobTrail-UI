import { JobsState, JobsActions } from "./types";
import { JobsActionTypes } from "./actions";

const initialState = {
  isPosting: false,
  lastPost: null,
  current: new Map(),
} as JobsState;

export default (state = initialState, action: JobsActions): JobsState => {
  switch (action.type) {
    case JobsActionTypes.ADDJOB_REQUEST:
      return { ...state, isPosting: true };
    case JobsActionTypes.ADDJOB_SUCCESS:
      return { ...state, isPosting: false, lastPost: new Date() };
    case JobsActionTypes.ADDJOB_FAILURE:
      return { ...state, isPosting: false };
    case JobsActionTypes.GETJOB_SUCCESS:
    case JobsActionTypes.GETJOBS_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
