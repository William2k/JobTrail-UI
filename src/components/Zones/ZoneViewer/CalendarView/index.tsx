import React, { useState, useMemo, useEffect } from "react";

import { getDaysInMonth } from "../../../../global/helpers";
import CalendarItem from "./CalendarItem";
import { useSelector } from "react-redux";
import { getCurrentUserSelector } from "../../../../store/currentUser/selectors";
import { useJobs, JobsQuery } from "./useJobs";
import AddJobModal from "../../AddJob";

enum CalendarViewModal {
  None,
  AddJob,
}

interface Props {
  zoneId: string;
}

const CalendarView = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substring(0, 7)
  );

  const [modal, setModal] = useState(CalendarViewModal.None);
  const [addJobDate, setAddJobDate] = useState(new Date());

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

  const handleSelectedDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleCloseModal = () => {
    setModal(CalendarViewModal.None);
  };

  const openAddJobs = (date: Date) => {
    setAddJobDate(date);

    setModal(CalendarViewModal.AddJob);
  };

  const { jobs } = useJobs(jobQuery);

  return (
    <div>
      {modal === CalendarViewModal.AddJob && (
        <AddJobModal
          zoneId={props.zoneId}
          showModal={true}
          toggle={handleCloseModal}
          defaultDate={addJobDate}
        />
      )}

      <div>
        <div className="form-group w-25">
          <label htmlFor="current-date">Current Date: </label>
          <input
            id="current-date"
            className="form-control"
            type="month"
            value={selectedDate}
            onChange={handleSelectedDateChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="current-user-only">Current User Only </label>
          <input
            id="current-user-only"
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
            addJob={openAddJobs}
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
