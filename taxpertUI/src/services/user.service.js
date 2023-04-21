import API from "../shared/API";
import { setUserListData } from "../store/user/UserActions";

export const getAllUsers = async (id) => {
  const res = await API({
    url: `/services/app/User/GetCustomers`,
  });
  setUserListData(res.items);
  return res.items;
};

export const postUserActivate = async (body) => {
  const res = await API({
    method: "post",
    url: `/services/app/User/Activate`,
    body: body,
    successMessage: "Assessee Activated Successfully",
  });
  return res;
};
