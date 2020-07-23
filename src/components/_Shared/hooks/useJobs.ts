import { useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse } from "axios";

import { Job } from "../../../global/models/job-models";

export interface JobsQuery {
  userId?: string;
  zoneId?: string;
  from?: Date;
  to?: Date;
}

export const useJobs = (query: JobsQuery) => {
  const [jobs, setJobs] = useState([] as Job[]);

  const updateJobs = useCallback(async () => {
    const response = (await axios.get("jobs", {
      params: { ...query },
    })) as AxiosResponse<Job[]>;

    setJobs(response.data);
  }, [query]);

  useEffect(() => {
    (async () => {
      await updateJobs();
    })();
  }, [query, updateJobs]);

  return { jobs, updateJobs };
};
