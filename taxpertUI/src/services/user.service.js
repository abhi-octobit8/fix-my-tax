import API from "../shared/API";
import { setUserListData } from "../store/user/UserActions";

export const getAllUsers = async (id) => {
  const res = await API({
    url: `/services/app/User/GetAll`,
  });
  // debugger;
  setUserListData(res.items);
  return res.items;
};
