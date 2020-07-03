import axios, { AxiosResponse } from "axios";

import AppState from "../state-model";
import { Dispatch } from "redux";
import { JobResponse, AddJob } from "../../global/models/job-models";
import {
  GetJobRequest,
  GetJobSuccess,
  GetJobFailure,
  GetJobsRequest,
  GetJobsSuccess,
  GetJobsFailure,
  GetJobsCanceled,
  AddJobRequest,
  AddJobSuccess,
  AddJobFailure,
} from "./types";
import { getJobsSelector } from "./selectors";
import { getCurrentUserSelector } from "../currentUser/selectors";
import { getOldDate } from "../../global/helpers";

export enum JobsActionTypes {
  GETJOB_REQUEST = "[GetJob] GetJob Request",
  GETJOB_FAILURE = "[GetJob] GetJob Failure",
  GETJOB_SUCCESS = "[GetJob] GetJob Success",
  GETJOB_CANCELED = "[GetJob] GetJob Cancel",

  GETJOBS_REQUEST = "[GetJobs] GetJobs Request",
  GETJOBS_FAILURE = "[GetJobs] GetJobs Failure",
  GETJOBS_SUCCESS = "[GetJobs] GetJobs Success",
  GETJOBS_CANCELED = "[GetJobs] GetJobs Cancel",

  ADDJOB_REQUEST = "[AddJob] AddJob Request",
  ADDJOB_FAILURE = "[AddJob] AddJob Failure",
  ADDJOB_SUCCESS = "[AddJob] AddJob Success",
}

export const jobActions = {
  getJob: (jobId: string) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    const state = getState();
    const jobsState = getJobsSelector(state);

    dispatch({
      type: JobsActionTypes.GETJOB_REQUEST,
    } as GetJobRequest);

    try {
      const response = (await axios.get(`jobs/${jobId}`)) as AxiosResponse<
        JobResponse
      >;

      const job = response.data;

      if (jobsState.current.has(job.zoneId)) {
        jobsState.current.get(job.zoneId)?.jobs.push(job);
      } else {
        jobsState.current.set(job.zoneId, {
          jobs: [job],
          lastFetch: new Date(),
        });
      }

      dispatch({
        type: JobsActionTypes.GETJOB_SUCCESS,
        payload: job,
      } as GetJobSuccess);
    } catch (error) {
      dispatch({
        type: JobsActionTypes.GETJOB_FAILURE,
      } as GetJobFailure);
    }
  },
  getJobs: (zoneId: string) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    const state = getState();
    const jobsState = getJobsSelector(state);
    const currentUser = getCurrentUserSelector(state);

    const date = getOldDate(5);
    const curr = jobsState.current.get(zoneId);

    if (
      !currentUser.isLoggedIn ||
      (curr && curr.lastFetch && curr.lastFetch > date)
    ) {
      return dispatch({
        type: JobsActionTypes.GETJOBS_CANCELED,
      } as GetJobsCanceled);
    }

    dispatch({
      type: JobsActionTypes.GETJOBS_REQUEST,
    } as GetJobsRequest);

    try {
      const response = (await axios.get(`jobs`, {
        params: { zoneId },
      })) as AxiosResponse<JobResponse[]>;

      const jobs = response.data;

      for (const job of jobs) {
        if (jobsState.current.has(job.zoneId)) {
          jobsState.current.get(job.zoneId)?.jobs.push(job);
        } else {
          jobsState.current.set(job.zoneId, {
            jobs: [job],
            lastFetch: new Date(),
          });
        }
      }

      dispatch({
        type: JobsActionTypes.GETJOBS_SUCCESS,
        payload: response.data,
      } as GetJobsSuccess);
    } catch (error) {
      dispatch({
        type: JobsActionTypes.GETJOBS_FAILURE,
      } as GetJobsFailure);
    }
  },
  addJob: (payload: AddJob) => async (
    dispatch: Dispatch<any>,
    getState: () => AppState
  ) => {
    dispatch({
      type: JobsActionTypes.ADDJOB_REQUEST,
    } as AddJobRequest);

    try {
      const response = (await axios.post("jobs", payload)) as AxiosResponse<
        string
      >;

      const jobId = response.data;

      dispatch({
        type: JobsActionTypes.ADDJOB_SUCCESS,
        payload: jobId,
      } as AddJobSuccess);

      dispatch(jobActions.getJob(jobId));
    } catch (error) {
      dispatch({
        type: JobsActionTypes.ADDJOB_FAILURE,
      } as AddJobFailure);
    }
  },
};