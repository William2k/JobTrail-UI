import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import ReactNotifications from "react-notifications-component";
import Axios from "axios";

import Nav from "./Nav";
import MainWrapper from "./_Shared/wrappers/MainWrapper";
import PrivateRoute from "./PrivateRoute";
import Account from "./Account";
import { getLocationSelector } from "../store/router/selectors";
import { getCurrentUserSelector } from "../store/currentUser/selectors";
import initialiser from "../appInitialiser";
import { currentUserActions } from "../store/currentUser/actions";
import { useConfig } from "../global/config";
import Home from "./Home";
import Zones from "./Zones";
import ZoneViewer from "./Zones/ZoneViewer";

Axios.defaults.baseURL = useConfig.apiBaseURL;

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initialiser(dispatch);
    dispatch(currentUserActions.getUser());
  }, [dispatch]);

  const location = useSelector(getLocationSelector);
  const currentUser = useSelector(getCurrentUserSelector);

  return (
    <>
      <ReactNotifications />
      <Nav />
      <MainWrapper>
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} timeout={500} classNames="page">
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <PrivateRoute
                path="/account"
                component={Account}
                authorised={currentUser.isLoggedIn}
              />
              <PrivateRoute
                exact
                path="/zones"
                component={Zones}
                authorised={currentUser.isLoggedIn}
              />
              <PrivateRoute
                path="/zones/:zoneId"
                component={ZoneViewer}
                authorised={currentUser.isLoggedIn}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </MainWrapper>
    </>
  );
};

export default App;
