import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUserZonesSelector } from "../../../store/zones/selectors";
import { Zone } from "../../../global/models/zone-models";
import { userZoneActions } from "../../../store/zones/actions";
import CalendarView from "./CalendarView";

interface MatchParams {
  zoneId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ZoneViewer = (props: Props) => {
  const dispatch = useDispatch();
  const zoneId = props.match.params.zoneId;

  const [zone, setZone] = useState({} as Zone);
  const userZones = useSelector(getUserZonesSelector);

  useEffect(() => {
    const current = userZones.zones.find((zone) => zone.id === zoneId);

    if (!current) {
      dispatch(userZoneActions.getUserZone(zoneId));

      return;
    }

    setZone(current);
  }, [userZones.zones, zoneId, dispatch]);

  return (
    <>
      <div>
        <h1>{zone.name}</h1>

        <div>
          <CalendarView zoneId={zoneId} />
        </div>
      </div>
    </>
  );
};

export default ZoneViewer;
