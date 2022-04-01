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

export const deleteCard = async (card_id, success, fail) => {
  await api.delete(`/card/${card_id}`).then(success).catch(fail);
};
