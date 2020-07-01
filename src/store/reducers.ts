import currentUserReducer from "./currentUser/reducer";
import zonesReducer from "./zones/reducer";
import jobsReducer from "./jobs/reducer";

const reducers = {
  currentUser: currentUserReducer,
  userZones: zonesReducer,
  jobs: jobsReducer,
};

export default reducers;
