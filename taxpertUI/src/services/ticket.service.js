import API from "../shared/API";
import {
  setNewRequestData,
  setTicketDetailsData,
  setTicketListData,
} from "../store/request/RequestActions";

export const getNewRequest = async (id) => {
  const res = await API({
    url: `/services/app/BagScanService/GetSearchByTag`,
  });
  setNewRequestData(res.items);
  return res.items;
};

export const getAllTickets = async (id) => {
  const res = await API({
    url: `/services/app/TicketService/GetAll`,
  });
  setTicketListData(res.items);
  return res.items;
};

export const getTicketDetails = async (id) => {
  const res = await API({
    url: `/services/app/TicketService/Get?id=${id}`,
  });
  setTicketDetailsData(res);
  return res;
};
