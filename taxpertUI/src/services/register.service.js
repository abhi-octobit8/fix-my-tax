import API from "../shared/API";
import { showNotification } from "../shared/utils";

export const registerNotice = async (body, uploadfileData) => {
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

// for registration of asseessee
export const registerUser = async (body, uploadfileData) => {
  const registerResponse = await API({
    method: "post",
    url: "services/app/RegisterService/Create",
    body: body,
  });
  if (registerResponse.error) {
    showNotification({
      message: registerResponse.errorMsg,
      // description: exceptionResponse.data.error.details,
      type: "error",
    });
  }

  if (registerResponse.userId && uploadfileData) {
    await uploadRegisterRequestFile(uploadfileData, registerResponse.userId);
  }

  return registerResponse;
};

// upload file on registration
export const uploadRegisterRequestFile = async (uploadfileData, userId) => {
  let formData = new FormData();

  formData.append(
    "file",
    uploadfileData[0].originFileObj,
    uploadfileData[0].originFileObj.name
  );

  const uploadData = {
    userId: userId,
    formData,
  };

  const res = await API({
    url: `services/app/FileService/UploadCategoryProofFile?userId=${uploadData.userId}`,
    method: "post",
    body: uploadData.formData,
  });
  return res;
};

export const contactUsService = async (body) => {
  const registerResponse = await API({
    method: "post",
    url: "services/app/RegisterService/ContactUs",
    body: body,
    successMessage:
      "Thank you for contacting us. fixmytax Team will revert you.",
  });

  return registerResponse;
};
