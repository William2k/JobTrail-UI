import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { Job } from "../../../../../global/models/job-models";
import CalendarJobItem from "./CalendarJobItem";

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

  .item-date {
    font-weight: bolder;
    border-bottom: 2px solid white;
    color: white;
  }

  .jobs-container {
    height: 154px;
    overflow: auto;
  }
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
      <div className="item-date">
        {props.date.getDate()}
        <FontAwesomeIcon
          className="float-right"
          role="button"
          icon={faPlus}
          onClick={handleAddJobClick}
        />
      </div>

      <div className="jobs-container">
        {props.jobs.map((job, i) => (
          <CalendarJobItem key={i} job={job} openJob={openJob} />
        ))}
      </div>
    </Item>
  );
};

export default CalendarItem;
