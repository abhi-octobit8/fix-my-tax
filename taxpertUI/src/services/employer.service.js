import API from "../shared/API";
import { setEmployerListData } from "../store/employer/employerActions";

export const getAllEmployer = async (id) => {
  const res = await API({
    url: `/services/app/User/GetAll`,
  });
  // debugger;
  setEmployerListData(res.items);
  return res.items;
};
