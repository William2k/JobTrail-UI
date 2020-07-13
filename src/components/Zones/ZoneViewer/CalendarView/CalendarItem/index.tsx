import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { Job } from "../../../../../global/models/job-models";
import styles from "./index.module.scss";
import JobItem from "./JobItem";

interface Props {
  jobs: Job[];
  date: Date;
  addJob: (date: Date) => void;
}

const Item = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 200px;
  border: 1px solid white;
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  transition: 1s;
  height: 200px;
`;

const CalendarItem = (props: Props) => {
  props.jobs.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const dispatch = useDispatch();

  const handleAddJobClick = () => {
    props.addJob(props.date);
  };

  const openJob = (jobId: string) => {
    dispatch(push(`/jobs/${jobId}`));
  };

  return (
    <Item>
      <div className={styles.itemDate}>
        {props.date.getDate()}
        <FontAwesomeIcon
          className="float-right"
          role="button"
          icon={faPlus}
          onClick={handleAddJobClick}
        />
      </div>

      <div className={styles.itemJobsContainer}>
        {props.jobs.map((job, i) => (
          <JobItem job={job} openJob={openJob} />
        ))}
      </div>
    </Item>
  );
};

export default CalendarItem;
