import { CurrentUserState } from "./currentUser/types";
import { RouterState } from "connected-react-router";
import { UserZonesState } from "./zones/types";
import { JobsState } from "./jobs/types";

export default interface AppState {
    currentUser: CurrentUserState;
    userZones: UserZonesState;
    router: RouterState;
    jobs: JobsState;
}