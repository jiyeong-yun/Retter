import { apiInstance } from ".";

const api = apiInstance();

export const sendMessage = async (params, success, fail) => {
  await api.post(`/character`, params).then(success).catch(fail);
};
