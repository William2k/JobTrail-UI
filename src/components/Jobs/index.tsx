import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { getCurrentUserSelector } from "../../store/currentUser/selectors";
import { JobsQuery, useJobs } from "../_Shared/hooks/useJobs";
import JobItem from "./JobItem";

const removeTime = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setMilliseconds(0);

  return date;
};

const toSimpleDate = (date: Date | undefined) => {
  return date?.toISOString().substring(0, 10);
};

const Jobs = () => {
  const currentUser = useSelector(getCurrentUserSelector);
  const dispatch = useDispatch();
  const endDateTmp = new Date();
  endDateTmp.setFullYear(endDateTmp.getFullYear() + 1);

  const [jobQuery, setJobQuery] = useState({
    userId: currentUser.user.id,
    from: removeTime(new Date()),
    to: removeTime(endDateTmp),
  } as JobsQuery);

  const { jobs } = useJobs(jobQuery);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobQuery({ ...jobQuery, from: new Date(e.target.value) });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobQuery({ ...jobQuery, to: new Date(e.target.value) });
  };

  const openJob = (jobId: string) => {
    dispatch(push(`/jobs/${jobId}`));
  };

  return (
    <div>
      <h1>{currentUser.user.username}'s jobs</h1>

      <div className="form-group w-25">
        <label htmlFor="start-date">Start Date: </label>
        <input
          id="start-date"
          className="form-control"
          type="date"
          value={toSimpleDate(jobQuery.from)}
          onChange={handleStartDateChange}
        />
      </div>

      <div className="form-group w-25">
        <label htmlFor="end-date">End Date: </label>
        <input
          id="end-date"
          className="form-control"
          type="date"
          value={toSimpleDate(jobQuery.to)}
          onChange={handleEndDateChange}
        />
      </div>

      <div>
        {jobs.map((job, i) => (
          <JobItem key={i} job={job} openJob={openJob} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
