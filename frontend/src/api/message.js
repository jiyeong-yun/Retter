import { apiInstance } from ".";

const api = apiInstance();

export const sendMessage = async (params, success, fail) => {
  await api
    .post(`/character/${params.id}`, { message: params.message })
    .then(success)
    .catch(fail);
};
