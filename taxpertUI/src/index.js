import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { getStore } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.less";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Application from "./components/application/Application";

ReactDOM.render(
  <Provider store={getStore()}>
    {/* <App /> */}
    <Router>
      <Application />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
