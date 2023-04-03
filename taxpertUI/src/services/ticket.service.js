import API from "../shared/API";
import {
  setNewRequestData,
  setTicketDetailsData,
  setTicketListData,
} from "../store/request/RequestActions";
import { uploadRequestFile } from "./register.service";

export const getAllTickets = async (id) => {
  const res = await API({
    url: `/services/app/TicketService/GetAll`,
  });
  setTicketListData(res.items);
  return res.items;
};

export const createTicketService = async (body, uploadfileData) => {
  const registerResponse = await API({
    method: "post",
    url: "services/app/TicketService/Create",
    body: body,
  });
  if (registerResponse.ticketId && uploadfileData) {
    let formData = new FormData();

    formData.append(
      "file",
      uploadfileData[0].originFileObj,
      uploadfileData[0].originFileObj.name
    );

    const uploadData = {
      id: registerResponse.ticketId,
      formData,
    };

    await uploadRequestFile(uploadData);
  }
  return registerResponse;
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
