import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUserZonesSelector } from "../../../store/zones/selectors";
import { Zone } from "../../../global/models/zone-models";
import { userZoneActions } from "../../../store/zones/actions";
import AddJobModal from "../AddJob";
import CalendarView from "./CalendarView";

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

  useEffect(() => {
    const current = userZones.zones.find((zone) => zone.id === zoneId);

    if (!current) {
      dispatch(userZoneActions.getUserZone(zoneId));

      return;
    }

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

        <div>
          <CalendarView zoneId={zoneId} />
        </div>
      </div>
    </>
  );
};

export default ZoneViewer;
