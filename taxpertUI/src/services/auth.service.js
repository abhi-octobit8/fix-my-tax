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
    url: "services/app/User/ChangePassword",
    body: body,
    successMessage: "Password Updated successfully",
  });

  return res;
};
