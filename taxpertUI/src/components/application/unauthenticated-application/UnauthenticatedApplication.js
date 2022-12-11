import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login";
// import Login from "../../Login";
// import { PATH } from "~/constant/Route";
// import LoginPage from "../../login/LoginPage";
// import Login from "~/component/page/login";
// import Footer from "~/component/common/footer";

import "./UnauthenticatedApplication.css";

const displayName = "UnauthenticatedApplication";

function UnauthenticatedApplication() {
  console.log("shamsher unauth");
  return (
    <main className="unauthenticated-application">
      <section className="unauthenticated-application-background" />

      <section className="unauthenticated-application-content">
        <Routes>
          <Route element={<Login />} path="/login" />

          <Route element={<Navigate to="/login" />} exact path="" />

          <Route element={<Navigate to="/login" />} exact path="/" />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>

      {/* <Footer className="unauthenticated-application-footer" /> */}
    </main>
  );
}

UnauthenticatedApplication.displayName = displayName;

export default UnauthenticatedApplication;
