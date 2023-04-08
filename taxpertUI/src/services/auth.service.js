import API from "../shared/API";

export const isTenantAvailable = async () => {
  const data = {
    tenancyName: "Default",
  };
  const response = await API({
    method: "post",
    url: "services/app/Account/IsTenantAvailable",
    body: data,
  });
  return response;
};

export const changePasswordService = async (body) => {
  const res = await API({
    method: "post",
    url: "services/app/FMTCustomerService/ChangePassword",
    body: body,
    successMessage: "Password Updated successfully",
  });

  return res;
};

export const forgotPasswordService = async (body) => {
  const res = await API({
    method: "post",
    url: "services/app/Account/ForgotPassword",
    body: body,
  });

  return res;
};

export const resetUserPasswordService = async (body) => {
  const res = await API({
    method: "post",
    url: "services/app/Account/ResetPassword",
    body: body,
  });

  return res;
};
