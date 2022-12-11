import React from "react";
import { node } from "prop-types";
// import ApplicationHeader from "~/component/application/application-header";
// import ApplicationFooter from "~/component/application/application-footer";

import "./ApplicationLayout.css";
import ApplicationHeader from "../application/application-header/ApplicationHeader";
import ApplicationFooter from "../application/application-footer/ApplicationFooter";

const displayName = "ApplicationLayout";

function ApplicationLayout(props) {
  const { children } = props;

  return (
    <main className="application-layout">
      <ApplicationHeader />

      <section className="application-layout-content">{children}</section>

      <ApplicationFooter />
    </main>
  );
}

ApplicationLayout.displayName = displayName;

export default ApplicationLayout;
