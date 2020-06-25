import currentUserReducer from "./currentUser/reducer";
import zonesReducer from "./zones/reducer";

const reducers = {
  currentUser: currentUserReducer,
  userZones: zonesReducer,
};

export default reducers;
