import types from "../types";

const initialState = {
  menuVisible: {
    sticker: false,
    background: false,
    text: false,
  },
  text: {
    message: "",
    isVisible: true,
    x: 50,
    y: 50,
  },
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MESSAGE:
      return {
        ...state,
        text: {
          ...state.text,
          message: action.message,
        },
      };
    case types.SET_TEXT_ISVISIBLE:
      return {
        ...state,
        text: {
          ...state.text,
          isVisible: !state.text.isVisible,
        },
      };
    default:
      return state;
  }
};

export default cardReducer;
