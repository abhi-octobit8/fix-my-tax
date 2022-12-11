import React from "react";

import AuthenticatedApplication from "./AuthenticatedApplication";
import { IntlProvider } from "react-intl";
import UnauthenticatedApplication from "./unauthenticated-application/UnauthenticatedApplication";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

function Application() {
  // const isAuthenticated = useSelector(
  //   (state) => state.authentication.userSession
  // );
  // const childNode = React.useMemo(() => {
  //   let childNode = <AuthenticatedApplication />;
  //   debugger;
  //   // if (isAuthenticated) {
  //   //   childNode = <AuthenticatedApplication />;
  //   // }

  //   return childNode;
  // }, [isAuthenticated]);

  return (
    <IntlProvider>
      <AuthenticatedApplication />
    </IntlProvider>
  );
}

export default Application;
