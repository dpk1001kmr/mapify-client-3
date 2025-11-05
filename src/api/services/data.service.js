import { api } from "../axios.config";
import { ENDPOINTS } from "../endpoints";

export const getData = async () => {
  const response = await api.get(ENDPOINTS.data);
  return response.data.data;
};

export const upload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post(ENDPOINTS.upload, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteUpload = async () => {
  const response = await api.post(ENDPOINTS.deleteUpload);
  return response.data;
};

/**
export const save = async (requestBody = {}, saveAnyway = false) => {
  const response = await api.post(ENDPOINTS.save, { requestBody, saveAnyway });
  return response.data;
};
 */

export const saveMappingSuccess = async () => {
  const response = await api.post(ENDPOINTS.saveMappingSuccess);
  return response.data;
};

export const saveMappingError = async (
  matchedSheets,
  mappedSheets,
  columnNamesMappingFormatClient
) => {
  console.log(matchedSheets, mappedSheets, columnNamesMappingFormatClient);
  const response = await api.post(ENDPOINTS.saveMappingError, {
    matchedSheets,
    mappedSheets,
    columnNamesMappingFormatClient,
  });
  return response.data;
};
