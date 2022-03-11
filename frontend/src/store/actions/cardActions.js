import types from "../types";

export const setMessage = (message) => {
  return {
    type: types.SET_MESSAGE,
    message,
  };
};

export const setTextIsVisible = () => {
  return {
    type: types.SET_TEXT_ISVISIBLE,
  };
};
