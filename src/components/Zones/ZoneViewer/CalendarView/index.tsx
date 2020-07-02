import React, { useState, useMemo, ChangeEvent, useEffect } from "react";

import { getDaysInMonth } from "../../../../global/helpers";
import CalendarItem from "./CalendarItem";
import { useSelector } from "react-redux";
import { getCurrentUserSelector } from "../../../../store/currentUser/selectors";
import { useJobs, JobsQuery } from "./useJobs";

interface Props {
  zoneId: string;
}

const CalendarView: React.FC<Props> = (props) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substring(0, 7)
  );

  const dates = useMemo(() => {
    const date = new Date(selectedDate);
    return getDaysInMonth(date.getMonth(), date.getFullYear());
  }, [selectedDate]);

  const currentUser = useSelector(getCurrentUserSelector);
  const [jobQuery, setJobQuery] = useState({
    userId: currentUser.user.id,
    zoneId: props.zoneId,
    from: dates[0],
    to: dates[dates.length - 1],
  } as JobsQuery);

  useEffect(() => {
    setJobQuery((j) => {
      return { ...j, from: dates[0], to: dates[dates.length - 1] };
    });
  }, [selectedDate, dates]);

  const handleCurrentUserOnlyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (jobQuery.userId == null) {
      setJobQuery({ ...jobQuery, userId: currentUser.user.id });
    } else {
      const { userId, ...newjobQuery } = jobQuery;

      setJobQuery(newjobQuery);
    }
  };

  const { jobs } = useJobs(jobQuery);

  return (
    <div>
      <div>
        <div className="form-group w-25">
          <label htmlFor="current-date">Current Date: </label>
          <input
            id="current-date"
            className="form-control"
            type="month"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="form-group w-25">
          <label htmlFor="current-user-only">Current User Only: </label>
          <input
            id="current-user-only"
            className="form-control form-check"
            type="checkbox"
            checked={jobQuery.userId != null}
            onChange={handleCurrentUserOnlyChange}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {dates.map((date, i) => (
          <CalendarItem
            key={i}
            jobs={jobs.filter(
              (job) => new Date(job.dueDate).getDate() === date.getDate()
            )}
            date={date}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
