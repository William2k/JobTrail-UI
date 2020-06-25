import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUserZonesSelector } from "../../store/zones/selectors";
import { userZonesActions } from "../../store/zones/actions";
import ZoneItem from "./ZoneItem";

const Zones: React.FC = () => {
  const dispatch = useDispatch();
  const userZones = useSelector(getUserZonesSelector);

  useEffect(() => {
    dispatch(userZonesActions.getUserZones);
  }, [dispatch]);

  return (
    <div>
      <h1>Zones</h1>
      {userZones && userZones.isFetching ? (
        <h2>Loading Zones</h2>
      ) : (
        <div>
          {userZones?.zones?.map((zone) => (
            <ZoneItem zone={zone} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Zones;
