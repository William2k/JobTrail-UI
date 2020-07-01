import { Job, JobResponse } from "../../global/models/job-models";
import { JobsActionTypes } from "./actions";
import { Action } from "redux";

export interface JobMap {
  jobs: Job[];
  lastFetch: Date | null;
}

export interface JobsState {
  isPosting: boolean;
  lastPost: Date | null;
  current: Map<string, JobMap>;
}

export interface GetJobRequest extends Action<JobsActionTypes.GETJOB_REQUEST> {}
export interface GetJobSuccess extends Action<JobsActionTypes.GETJOB_SUCCESS> {
  payload: JobResponse;
}
export interface GetJobCanceled
  extends Action<JobsActionTypes.GETJOB_CANCELED> {}
export interface GetJobFailure extends Action<JobsActionTypes.GETJOB_FAILURE> {}

export interface GetJobsRequest
  extends Action<JobsActionTypes.GETJOBS_REQUEST> {}
export interface GetJobsSuccess
  extends Action<JobsActionTypes.GETJOBS_SUCCESS> {
  payload: JobResponse[];
}
export interface GetJobsCanceled
  extends Action<JobsActionTypes.GETJOBS_CANCELED> {}
export interface GetJobsFailure
  extends Action<JobsActionTypes.GETJOBS_FAILURE> {}

export interface AddJobRequest extends Action<JobsActionTypes.ADDJOB_REQUEST> {}
export interface AddJobSuccess extends Action<JobsActionTypes.ADDJOB_SUCCESS> {
  payload: string;
}
export interface AddJobFailure extends Action<JobsActionTypes.ADDJOB_FAILURE> {}

export type JobsActions =
  | GetJobRequest
  | GetJobSuccess
  | GetJobCanceled
  | GetJobFailure
  | GetJobsRequest
  | GetJobsSuccess
  | GetJobsCanceled
  | GetJobsFailure
  | AddJobRequest
  | AddJobSuccess
  | AddJobFailure;
