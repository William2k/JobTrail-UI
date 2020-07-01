import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserZonesSelector } from "../../../store/zones/selectors";
import { Zone } from "../../../global/models/zone-models";
import { userZoneActions } from "../../../store/zones/actions";
import { jobActions } from "../../../store/jobs/actions";

interface MatchParams {
  zoneId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ZoneViewer: React.FC<Props> = (props) => {
  const [zone, setZone] = useState({} as Zone);
  const userZones = useSelector(getUserZonesSelector);
  const dispatch = useDispatch();
  const zoneId = props.match.params.zoneId;

  useEffect(() => {
    const current = userZones.zones.find(
      (zone) => zone.id === zoneId
    );

    if (!current) {
      dispatch(userZoneActions.getUserZone(zoneId));

      return;
    }

    dispatch(jobActions.getJobs(zoneId))

    setZone(current);
  }, [userZones.zones, zoneId, dispatch]);

  return (
    <div>
      <h1>{zone.name}</h1>
    </div>
  );
};

export default ZoneViewer;
