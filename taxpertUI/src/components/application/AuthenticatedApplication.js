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
import ItrNoticePage from "../pages/services/itr-notice/ItrNoticePage";
import GstNoticeService from "../pages/services/gst-notice/GstNoticeService";
import RegisterPage from "../pages/register/RegisterPage";
import { checkLogin } from "../../store/authentication/AuthActions";
import { useSelector } from "react-redux";
// import CreateRequestPage from "../pages/request/new-request/create-request/CreateRequestPage";
import { PATH } from "../../shared/Route";
import ConsultationNotice from "../pages/services/consultation-notice/ConsultationNotice";
// import FilingItr from "../pages/services/filing-itr/FilingItr";
import LatestNewsPage from "../pages/latest-news/LatestNewsPage";
import AdminLayout from "../pages/admin/admin-layout/AdminLayout";
import UserComponent from "../pages/admin/user/User";
import DashBoard from "../pages/admin/dahboard/DashBoard";
import AdvocateList from "../pages/admin/advocate/AdvocateList";
import TicketListRequest from "../pages/admin/ticket/TicketListRequest";
import UserRouter from "../pages/admin/user/UserRouter";
import AdvocateRoutes from "../pages/admin/advocate/AdvocateRoutes";
import TicketRoutes from "../pages/admin/ticket/TicketRoutes";
import ResetPassword from "../pages/reset-password/ResetPassword";
import MembershipPage from "../pages/membership/MembershipPage";
import FilingItr from "../pages/services/filing-itr/FilingItr";
import FilingTdsPage from "../pages/services/filing-tds/FilingTdsPage";
// React.lazy(() =>
//       import(
//         /* webpackChunkName: "product-module" */ "./modules/product/ProductRoutes.js"
//       )
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
        <Route element={<ResetPassword />} path="/resetpassword/*" />
        <Route path="about" element={<AboutPage />} />
        <Route path="membership" element={<MembershipPage />} />
        <Route path={PATH.ITR_NOTICE_PATH} element={<ItrNoticePage />} />
        <Route path={PATH.GST_NOTICE} element={<GstNoticeService />} />
        <Route
          path={PATH.SERVICE_COSULTATION}
          element={<ConsultationNotice />}
        />
        <Route path={PATH.SERVICE_ITR_FILING} element={<FilingItr />} />
        <Route path={PATH.SERVICE_TDS_TCS_FILING} element={<FilingTdsPage />} />
        <Route path="latest-news" element={<LatestNewsPage />} />

        <Route path="home" element={<HomePage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="tnc" element={<TnC />} />
        <Route path="register" element={<RegisterPage />} />

        {/* <Route element={<AccountLayout />} path="request">
          <Route element={<NewRequest />} path="newrequest" />
          <Route element={<CreateRequestPage />} path="newrequest/create" />
          <Route element={<PendingRequest />} exact path="pendingrequest" />
        </Route> */}
        <Route element={<AdminLayout />} path="admin">
          <Route element={<DashBoard />} path="dashboard" />

          <Route element={<UserRouter />} path="user/*" />

          <Route element={<AdvocateRoutes />} path="psp/*" />
          {/* <Route element={<AdvocateList />} path="advocate" /> */}
          <Route element={<TicketRoutes />} path="requests/*" />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </ApplicationLayout>
  );
}

export default AuthenticatedApplication;
