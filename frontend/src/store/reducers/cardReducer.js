import types from "../types";

const cardState = {
  message: "",
};

const cardReducer = (state = cardState, action) => {
  switch (action.type) {
    case types.SET_MESSAGE:
      const message = action.message;
      return { ...state, message };
    default:
      return state;
  }
};

export default cardReducer;
