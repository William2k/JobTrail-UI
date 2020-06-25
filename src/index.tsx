import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import "bootstrap/scss/bootstrap.scss";
import "react-notifications-component/dist/theme.css";
import "animate.css";

import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from "./store/configureStore";
import AppState from "./store/state-model";

const initialState = (window as any).initialReduxState as AppState;
const store = configureStore(initialState);

const rootElem = document.querySelector("#root") as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElem
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
