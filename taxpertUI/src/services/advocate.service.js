import API from "../shared/API";
import { setAdvocateListData } from "../store/advocate/advocateActions";

export const getAllAdvocate = async () => {
  const res = await API({
    url: `/services/app/User/GetAdvocates`,
  });
  // debugger;
  setAdvocateListData(res.items);
  return res.items;
};

export const deleteAdvocate = async (id) => {
  await API({
    url: `/services/app/User/Delete?Id=${id}`,
    successMessage: "PSP deleted successfully",
    method: "delete",
  });
};

export const createAdvocate = async (body) => {
  const res = await API({
    url: `/services/app/User/CreateAdvocate`,
    method: "post",
    body,
  });
  // setAdvocateListData(res.items);
  return res;
};
