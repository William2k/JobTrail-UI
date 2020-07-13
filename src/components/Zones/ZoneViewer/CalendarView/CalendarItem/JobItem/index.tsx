import React from "react";
import { Job } from "../../../../../../global/models/job-models";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./index.module.scss";

interface Props {
  job: Job;
  openJob: (jobId: string) => void;
}

const JobItem = (props: Props) => {
  const handleJobClick = () => {
    props.openJob(props.job.id);
  };

  return (
    <Tooltip title={new Date(props.job.dueDate).toLocaleString()}>
      <button
        className={styles.itemJobs + " btn btn-info"}
        onClick={handleJobClick}
      >
        <div>{props.job.name}</div>
      </button>
    </Tooltip>
  );
};

export default JobItem;
