import types from "../types";

const initialState = {
  width: 200,
  height: 200,
  y: 0,
  x: 0,
  display: "none",
  scale: 1,
};

const selectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTOR: {
      return {
        ...state,
        ...action.nextSelector,
      };
    }
    default:
      return state;
  }
};

export default selectorReducer;
