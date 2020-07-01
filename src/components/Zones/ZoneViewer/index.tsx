import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserZonesSelector } from "../../../store/zones/selectors";
import { Zone } from "../../../global/models/zone-models";
import { userZoneActions } from "../../../store/zones/actions";
import { jobActions } from "../../../store/jobs/actions";
import AddJobModal from "../AddJob";
import { getJobsSelector } from "../../../store/jobs/selectors";
import JobItem from "./JobItem";

enum ZoneViewerModal {
  None,
  AddJob,
}

interface MatchParams {
  zoneId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ZoneViewer: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const zoneId = props.match.params.zoneId;

  const [zone, setZone] = useState({} as Zone);
  const [modal, setModal] = useState(ZoneViewerModal.None);
  const userZones = useSelector(getUserZonesSelector);
  const jobs = useSelector(getJobsSelector);

  useEffect(() => {
    const current = userZones.zones.find((zone) => zone.id === zoneId);

    if (!current) {
      dispatch(userZoneActions.getUserZone(zoneId));

      return;
    }

    dispatch(jobActions.getJobs(zoneId));

    setZone(current);
  }, [userZones.zones, zoneId, dispatch]);

  const handleCloseModal = () => {
    setModal(ZoneViewerModal.None);
  };

  return (
    <>
      {modal === ZoneViewerModal.AddJob && (
        <AddJobModal
          zoneId={zoneId}
          showModal={true}
          toggle={handleCloseModal}
        />
      )}
      <div>
        <h1>{zone.name}</h1>

        <div>
          <button
            className="btn btn-info"
            onClick={() => setModal(ZoneViewerModal.AddJob)}
          >
            Add Job
          </button>
        </div>
        <div className="d-flex">
          {jobs.current.get(zoneId)?.jobs.map((job, i) => (
            <JobItem key={i} job={job} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ZoneViewer;
