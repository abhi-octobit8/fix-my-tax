import API from "../shared/API";
import { NOTICE_TYPE } from "../shared/constants";
import { setNewRequestData } from "../store/request/RequestActions";

export const getNewRequest = async (id) => {
  const res = await API({
    url: `/services/app/BagScanService/GetSearchByTag`,
  });
  setNewRequestData(res.items);
  return res.items;
};

export const registerNotice = async (values) => {
  const formData = {
    noticeType: NOTICE_TYPE.ITR_NOTICE,
    name: values.name,
    email: values.email,
    phoneNumber: values.phoneNumber,
    noticeQuestion: values.service,
  };
  console.log(values);
  debugger;
  const registerResponse = await API({
    method: "post",
    url: "services/app/RegisterService/Create",
    body: formData,
  });
  //   if (registerResponse.ticketId && values.uploadNotice) {
  //     let formData = new FormData();

  //     // let file = values.uploadNotice;
  //     formData.append(
  //       "file",
  //       values.uploadNotice[0],
  //       values.uploadNotice[0].name
  //     );

  //     const uploadData = {
  //       id: registerResponse.ticketId,
  //       file: formData,
  //     };
  //     const uploadFile = await uploadRequestFile(uploadData);
  //     debugger;
  //   }
  return registerResponse;
};

const uploadRequestFile = async (uploadData) => {
  const res = await API({
    url: `services/app/FileService/UploadRequestFile`,
    body: uploadData,
  });
  return res.items;
};
