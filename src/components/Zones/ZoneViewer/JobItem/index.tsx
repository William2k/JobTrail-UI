import React from "react";
import { Job } from "../../../../global/models/job-models";
import styled from "styled-components";

interface Props {
  job: Job;
}

const Item = styled.div`
  flex: 1;
  border: 1px solid red;
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  transition: 1s;
`;

const JobItem: React.FC<Props> = (props) => {
  return <Item>{props.job.name}</Item>;
};

export default JobItem;
