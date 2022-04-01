import { apiInstance } from ".";

const api = apiInstance();

export const sendMessage = async (params, success, fail) => {
  await api.post(`/character/`, params).then(success).catch(fail);
};

export const sendImageURL = async (params, success, fail) => {
  await api
    .post(`/card/${params.card_id}/`, params.form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(success)
    .catch(fail);
};
