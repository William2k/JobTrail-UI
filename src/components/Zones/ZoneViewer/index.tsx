import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserZonesSelector } from "../../../store/zones/selectors";
import { Zone } from "../../../global/models/zone-models";

interface MatchParams {
  zoneId?: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ZoneViewer: React.FC<Props> = (props) => {
  const [zone, setZone] = useState({} as Zone);
  const userZones = useSelector(getUserZonesSelector);

  useEffect(() => {
    setZone(
      userZones.zones.find((zone) => zone.id === props.match.params.zoneId) ||
        ({} as Zone)
    );
  }, [userZones.zones, props.match.params.zoneId]);

  return (
    <div>
      <h1>{zone.name}</h1>
    </div>
  );
};

export default ZoneViewer;
