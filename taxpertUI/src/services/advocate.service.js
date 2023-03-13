import API from "../shared/API";
import { setAdvocateListData } from "../store/advocate/advocateActions";

export const getAllAdvocate = async (id) => {
  const res = await API({
    url: `/services/app/User/GetAll`,
  });
  // debugger;
  setAdvocateListData(res.items);
  return res.items;
};

export const createAdvocate = async (body) => {
  const res = await API({
    url: `/services/app/User/Create`,
    method: "post",
    body,
  });
  debugger;
  // setAdvocateListData(res.items);
  return res;
};
