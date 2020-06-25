import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUserSelector } from "../../../store/currentUser/selectors";
import { getUserZonesSelector } from "../../../store/zones/selectors";
import { userZonesActions } from "../../../store/zones/actions";

const LoggedInHome: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const userZones = useSelector(getUserZonesSelector);

  useEffect(() => {
    dispatch(userZonesActions.getUserZones);
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>

      <p>Hi {user.username}</p>

      {userZones && userZones.isFetching ? <h2>Loading Zones</h2> : <div> </div>} 
    </div>
  );
};

export default LoggedInHome;
