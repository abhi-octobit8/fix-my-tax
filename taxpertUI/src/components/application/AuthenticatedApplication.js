import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/about/AboutPage";
import HomePage from "../pages/home/HomePage";
import ApplicationLayout from "../application-layout/ApplicationLayout";
import Login from "../pages/login/Login";
import ContactUs from "../pages/contact-us/ContactUs";
import TnC from "../pages/tnc/TnC";
import ItrNoticePage from "../pages/services/itr-notice/ItrNoticePage";
import GstNoticePage from "../pages/services/gst-notice/GstNoticePage";
import RegisterPage from "../pages/register/RegisterPage";
import { checkLogin } from "../../store/authentication/AuthActions";
import { useSelector } from "react-redux";
import { PATH } from "../../shared/Route";
import LatestNewsPage from "../pages/latest-news/LatestNewsPage";
import AdminLayout from "../pages/admin/admin-layout/AdminLayout";
import DashBoard from "../pages/admin/dahboard/DashBoard";
import UserRouter from "../pages/admin/user/UserRouter";
import AdvocateRoutes from "../pages/admin/advocate/AdvocateRoutes";
import TicketRoutes from "../pages/admin/ticket/TicketRoutes";
import ResetPassword from "../pages/reset-password/ResetPassword";
import MembershipPage from "../pages/membership/MembershipPage";
import FilingTdsPage from "../pages/services/filing-tds/FilingTdsPage";
import GstReturnPage from "../pages/services/gst-return/GstReturnPage";
import FilingItrPage from "../pages/services/filing-itr/FilingItrPage";
import TaxAppealPage from "../pages/services/tax-appeal/TaxAppealPage";
import BusinessConsultationPage from "../pages/services/business-consultation/BusinessConsultationPage";
import CheckoutPage from "../../modules/checkout/CheckoutPage";

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
        <Route path={PATH.SERVICE_TAX_APPEAL} element={<TaxAppealPage />} />
        <Route path={PATH.GST_NOTICE} element={<GstNoticePage />} />
        <Route
          path={PATH.SERVICE_BUSINESS_CONSULTATION}
          element={<BusinessConsultationPage />}
        />

        <Route path={PATH.SERVICE_ITR_FILING} element={<FilingItrPage />} />
        <Route path={PATH.SERVICE_GST_RETURN} element={<GstReturnPage />} />
        <Route path={PATH.SERVICE_TDS_TCS_FILING} element={<FilingTdsPage />} />
        <Route path={PATH.CHECKOUT} element={<CheckoutPage />} />
        <Route path="latest-news" element={<LatestNewsPage />} />

        <Route path="home" element={<HomePage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="tnc" element={<TnC />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<AdminLayout />} path="admin">
          <Route element={<DashBoard />} path="dashboard" />

          <Route element={<UserRouter />} path="user/*" />

          <Route element={<AdvocateRoutes />} path="psp/*" />
          <Route element={<TicketRoutes />} path="requests/*" />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </ApplicationLayout>
  );
}

export default AuthenticatedApplication;
