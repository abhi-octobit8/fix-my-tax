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

export const uploadRequestFile = async (uploadData) => {
  const res = await API({
    url: `services/app/FileService/UploadRequestFile?id=${uploadData.id}`,
    method: "post",
    body: uploadData.formData,
  });
  return res;
};
