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

export const setMenuStickerIsVisible = () => {
  return {
    type: types.SET_MENU_STICKER_ISVISIBLE,
  };
};

export const setMenuBackgroundIsVisible = () => {
  return {
    type: types.SET_MENU_BACKGROUND_ISVISIBLE,
  };
};

export const setMenuTextIsVisible = () => {
  return {
    type: types.SET_MENU_TEXT_ISVISIBLE,
  };
};
