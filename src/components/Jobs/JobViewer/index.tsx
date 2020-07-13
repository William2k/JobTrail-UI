import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { JobResponse, Job } from "../../../global/models/job-models";

interface MatchParams {
  jobId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const JobViewer = (props: Props) => {
  const jobId = props.match.params.jobId;

  const [job, setJob] = useState({} as Job);

  const getJob = useCallback(async () => {
    const response = (await axios.get(`jobs/${jobId}`)) as AxiosResponse<
      JobResponse
    >;

    setJob(response.data);
  }, [jobId]);

  useEffect(() => {
    (async () => {
      await getJob();
    })();
  }, [getJob]);

  return (
    <div>
      <h1>{job.name}</h1>

      <div>{job.description}</div>
    </div>
  );
};

export default JobViewer;
