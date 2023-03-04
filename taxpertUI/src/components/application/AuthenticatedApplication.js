import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/about/AboutPage";
import HomePage from "../pages/home/HomePage";
import ApplicationLayout from "../application-layout/ApplicationLayout";
import AccountLayout from "../pages/request/account-layout/AccountLayout";
import NewRequest from "../pages/request/new-request/NewRequest";
import PendingRequest from "../pages/request/pending-request/PendingRequest";
import Login from "../pages/login/Login";
import ContactUs from "../pages/contact-us/ContactUs";
import TnC from "../pages/tnc/TnC";
import ItrNoticeService from "../pages/services/itr-notice/ItrNoticeService";
import GstNoticeService from "../pages/services/gst-notice/GstNoticeService";
import RegisterPage from "../pages/register/RegisterPage";
import { checkLogin } from "../../store/authentication/AuthActions";
import { useSelector } from "react-redux";
import CreateRequestPage from "../pages/request/new-request/create-request/CreateRequestPage";
import { PATH } from "../../shared/Route";
import ConsultationNotice from "../pages/services/consultation-notice/ConsultationNotice";
import FilingNotice from "../pages/services/filing-notice/FilingNotice";
import LatestNewsPage from "../pages/latest-news/LatestNewsPage";
import AdminLayout from "../pages/admin/admin-layout/AdminLayout";
import UserComponent from "../pages/admin/user/User";
import DashBoard from "../pages/admin/dahboard/DashBoard";
import EmployerList from "../pages/admin/employer/EmployerList";
import TicketListRequest from "../pages/admin/ticket/TicketListRequest";

function AuthenticatedApplication() {
  const userSessionInfo = useSelector(
    (state) => state.authentication.userSession
  );
  React.useEffect(() => {
    (async () => {
      if (userSessionInfo?.accessToken)
        await checkLogin(userSessionInfo.userId);
    })();
  }, [userSessionInfo]);

  return (
    <ApplicationLayout>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route path="about" element={<AboutPage />} />
        <Route path={PATH.ITR_NOTICE_PATH} element={<ItrNoticeService />} />
        <Route path={PATH.GST_NOTICE} element={<GstNoticeService />} />
        <Route
          path={PATH.SERVICE_COSULTATION}
          element={<ConsultationNotice />}
        />
        <Route path={PATH.SERVICE_FILING} element={<FilingNotice />} />
        <Route path="latest-news" element={<LatestNewsPage />} />

        <Route path="home" element={<HomePage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="tnc" element={<TnC />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<AccountLayout />} path="request">
          <Route element={<NewRequest />} path="newrequest" />
          <Route element={<CreateRequestPage />} path="newrequest/create" />
          <Route element={<PendingRequest />} exact path="pendingrequest" />
        </Route>
        <Route element={<AdminLayout />} path="admin">
          <Route element={<DashBoard />} path="dashboard" />
          <Route element={<UserComponent />} path="user" />
          <Route element={<EmployerList />} path="employer" />
          <Route element={<TicketListRequest />} path="requests" />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </ApplicationLayout>
  );
}

export default AuthenticatedApplication;
