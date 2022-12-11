import React from "react";

import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/about/AboutPage";
import HomePage from "../pages/home/HomePage";
import ApplicationLayout from "../application-layout/ApplicationLayout";
import AccountLayout from "../pages/request/account-layout/AccountLayout";
import NewRequest from "../pages/request/new-request/NewRequest";
import PendingRequest from "../pages/request/pending-request/PendingRequest";
import Login from "../pages/login/Login";

function AuthenticatedApplication() {
  return (
    <ApplicationLayout>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route path="about" element={<AboutPage />} />
        <Route path="home" element={<HomePage />} />
        <Route element={<AccountLayout />} path="request">
          <Route element={<NewRequest />} path="newrequest" />
          <Route element={<PendingRequest />} exact path="pendingrequest" />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </ApplicationLayout>
  );
}

export default AuthenticatedApplication;
