import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";

import { Job } from "../../../../../../global/models/job-models";

const JobItemBtnStyle = styled.button`
  width: 100%;
  border-radius: 0;
  font-weight: bolder;
  border-bottom: 1px solid #ffbc00;
`;

interface Props {
  job: Job;
  openJob: (jobId: string) => void;
}

const CalendarJobItem = (props: Props) => {
  const handleJobClick = () => {
    props.openJob(props.job.id);
  };

  return (
    <Tooltip title={new Date(props.job.dueDate).toLocaleString()}>
      <JobItemBtnStyle className="btn btn-info" onClick={handleJobClick}>
        <div>{props.job.name}</div>
      </JobItemBtnStyle>
    </Tooltip>
  );
};

export default CalendarJobItem;
