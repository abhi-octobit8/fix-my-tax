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

export const updateAssignment = async (formData) => {
  const res = await API({
    url: `services/app/TicketService/UpdateAssignment`,
    method: "PUT",
    body: formData,
    successMessage: "Ticket Assigned successfully",
  });
  return res;
};

export const downloadAPI = async (id) => {
  const res = await API({
    url: `services/app/FileService/DownloadFile?id=${id}`,
    method: "POST",
    responseTypeData: "blob",
  });
  return res;
};
