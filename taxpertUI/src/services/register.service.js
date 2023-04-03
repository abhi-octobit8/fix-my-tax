import API from "../shared/API";
import { setNewRequestData } from "../store/request/RequestActions";

export const registerNotice = async (body, uploadfileData) => {
  console.log(body);
  const registerResponse = await API({
    method: "post",
    url: "services/app/RegisterService/Create",
    body: body,
  });
  if (registerResponse.ticketId && uploadfileData) {
    // let formData = new FormData();

    // formData.append(
    //   "file",
    //   uploadfileData[0].originFileObj,
    //   uploadfileData[0].originFileObj.name
    // );

    // const uploadData = {
    //   id: registerResponse.ticketId,
    //   formData,
    // };

    await uploadRequestFile(uploadfileData, registerResponse.ticketId);
  }
  return registerResponse;
};

export const uploadRequestFile = async (uploadfileData, id) => {
  debugger;
  let formData = new FormData();

  formData.append(
    "file",
    uploadfileData[0].originFileObj,
    uploadfileData[0].originFileObj.name
  );

  const uploadData = {
    id: id,
    formData,
  };

  const res = await API({
    url: `services/app/FileService/UploadRequestFile?id=${uploadData.id}`,
    method: "post",
    body: uploadData.formData,
  });
  return res;
};
