import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import useNotification, {
  NotificationType,
} from "../../_Shared/hooks/useNotification";

import { JobResponse, Job } from "../../../global/models/job-models";
import { useSelector } from "react-redux";
import { getCurrentUserSelector } from "../../../store/currentUser/selectors";

const TakeJobButton = styled(Button)`
  &.MuiButton-root {
    background-color: green;
    color: #fff;

    &:hover {
      background-color: green;
    }
  }
`;

interface MatchParams {
  jobId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const JobViewer = (props: Props) => {
  const jobId = props.match.params.jobId;
  const { notify } = useNotification();
  const currentUser = useSelector(getCurrentUserSelector);

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

  const handleTakeJobClick = async () => {
    try {
      await axios.put(`jobs/${jobId}/takeJob`);

      await getJob();
    } catch (error) {
      notify(
        "Taking Job Failed",
        "Taking the job failed. Refresh the page and try again.",
        NotificationType.Danger
      );
    }
  };

  return (
    <div>
      <h1>{job.name}</h1>

      <div>{job.description}</div>

      <div>
        {job.assignedUserId !== currentUser.user.id && (
          <TakeJobButton variant="contained" onClick={handleTakeJobClick}>
            Take Job
          </TakeJobButton>
        )}
      </div>
    </div>
  );
};

export default JobViewer;
