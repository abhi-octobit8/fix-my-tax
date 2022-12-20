import React from "react";

import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/about/AboutPage";
import HomePage from "../pages/home/HomePage";
import ApplicationLayout from "../application-layout/ApplicationLayout";
import AccountLayout from "../pages/request/account-layout/AccountLayout";
import NewRequest from "../pages/request/new-request/NewRequest";
import PendingRequest from "../pages/request/pending-request/PendingRequest";
import Login from "../pages/login/Login";
import ServicePage from "../pages/services/ServicePage";
import ContactUs from "../pages/contact-us/ContactUs";
import TnC from "../pages/tnc/TnC"


function AuthenticatedApplication() {
  return (
    <ApplicationLayout>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="contact" element={<ContactUs/>}/>
        <Route path="tnc" element={<TnC />}/>

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
