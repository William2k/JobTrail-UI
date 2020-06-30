import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUserZonesSelector } from "../../store/zones/selectors";
import { userZonesActions } from "../../store/zones/actions";
import ZoneItem from "./ZoneItem";
import AddZoneModal from "./AddZone";

enum ZoneModal {
  None,
  AddZone,
}

const Zones: React.FC = () => {
  const dispatch = useDispatch();
  const userZones = useSelector(getUserZonesSelector);

  useEffect(() => {
    dispatch(userZonesActions.getUserZones);
  }, [dispatch]);

  const [modal, setModal] = useState(ZoneModal.None);

  const handleCloseModal = () => {
    setModal(ZoneModal.None);
  };

  return (
    <div>
      <h1>Zones</h1>

      <button
        className="btn btn-info"
        onClick={() => setModal(ZoneModal.AddZone)}
      >
        Add Zone
      </button>

      {modal === ZoneModal.AddZone && (
        <AddZoneModal showModal={true} toggle={handleCloseModal} />
      )}

      {userZones && userZones.isFetching ? (
        <h2>Loading Zones</h2>
      ) : (
        <div className="d-flex">
          {userZones?.zones?.map((zone, i) => (
            <ZoneItem key={i} zone={zone}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Zones;
