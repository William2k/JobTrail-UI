import { CurrentUserState } from "./currentUser/types";
import { RouterState } from "connected-react-router";

export default interface AppState {
    currentUser: CurrentUserState;
    router: RouterState;
}