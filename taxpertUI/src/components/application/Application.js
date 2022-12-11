import React from "react";

import AuthenticatedApplication from "./AuthenticatedApplication";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

function Application() {
  return (
    <IntlProvider>
      <AuthenticatedApplication />
    </IntlProvider>
  );
}

export default Application;
