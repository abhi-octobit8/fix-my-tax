import API from "../shared/API";
import { setNewRequestData } from "../store/request/RequestActions";

export const registerNotice = async (body, uploadfileData) => {
  console.log(body);
  const registerResponse = await API({
    method: "post",
    url: "services/app/RegisterService/Create",
    body: body,
  });
  if (registerResponse.id && uploadfileData) {
    await uploadRequestFile(uploadfileData, registerResponse.id);
  }
  return registerResponse;
};

export const registerUser = async (body, uploadfileData) => {
  console.log(body);
  const registerResponse = await API({
    method: "post",
    url: "services/app/RegisterService/Create",
    body: body,
  });

  return registerResponse;
};
export const uploadRequestFile = async (uploadfileData, id) => {
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
