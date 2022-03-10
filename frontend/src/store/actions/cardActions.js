import types from "../types";

export const setMessage = (message) => {
  return {
    type: types.SET_MESSAGE,
    message,
  };
};
