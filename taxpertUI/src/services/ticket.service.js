import API from "../shared/API";
import {
  setTicketDetailsData,
  setTicketListData,
} from "../store/request/RequestActions";

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
  if (registerResponse.id && uploadfileData) {
    let formData = new FormData();

    formData.append(
      "file",
      uploadfileData[0].originFileObj,
      uploadfileData[0].originFileObj.name
    );

    const uploadData = {
      id: registerResponse.id,
      formData,
    };

    await uploadRequestFile(uploadData);
  }
  return registerResponse;
};
export const uploadRequestFile = async (uploadData, id) => {
  const res = await API({
    url: `services/app/FileService/UploadRequestFile?id=${uploadData.id}`,
    method: "post",
    body: uploadData.formData,
  });
  return res;
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

export const downloadAPI = async (
  id,
  url = `services/app/FileService/DownloadFile?id=${id}`
) => {
  const res = await API({
    url: url,
    method: "POST",
    responseTypeData: "blob",
  });
  return res;
};

export const getAllTicketComments = async (id) => {
  try {
    const res = await API({
      url: `services/app/CommentService/GetAll?requestTicketId=${id}`,
    });
    return res.items;
  } catch (e) {
    console.error(e);
  }
};

export const createTicketComment = async (body) => {
  const res = await API({
    method: "post",
    url: "services/app/CommentService/Create",
    body: body,
  });

  return res;
};

export const updateTicketStatus = async (data, id) => {
  const res = await API({
    method: "put",
    url: `services/app/TicketService/updateTicketStatus?requestTicketId=${id}`,
    body: data,
  });
  if (res) {
    await getTicketDetails(id);
  }

  return res;
};

export const GetServicePrice = async (pricingKey) => {
  const res = await API({
    url: `/services/app/RatecardService/Get?pricingKey=${pricingKey}`,
  });
  return res;
};

export const GetVCAvailableSlots = async (input) => {
  const res = await API({
    url: `/services/app/SlotService/GetAvailableSlots?input=${input}`,
  });
  return res;
};
