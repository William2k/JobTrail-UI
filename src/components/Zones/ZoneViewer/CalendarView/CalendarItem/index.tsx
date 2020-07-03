import React from "react";
import styled from "styled-components";

import { Job } from "../../../../../global/models/job-models";

interface Props {
  jobs: Job[];
  date: Date;
}

const Item = styled.div`
  min-width: 200px;
  border: 1px solid red;
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  transition: 1s;
`;

const CalendarItem: React.FC<Props> = (props) => {
  return (
    <Item>
      <span>{props.date.getDate()}</span>

      {props.jobs.map((job, i) => (
        <div key={i}>
          <div>{job.name}</div>
        </div>
      ))}
    </Item>
  );
};

export default CalendarItem;
