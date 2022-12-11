import API from "../shared/API";
import { setNewRequestData } from "../store/request/RequestActions";

export const getNewRequest = async (id) => {
  const res = await API({
    url: `/services/app/BagScanService/GetSearchByTag`,
  });
  setNewRequestData(res.items);
  return res.items;
};
