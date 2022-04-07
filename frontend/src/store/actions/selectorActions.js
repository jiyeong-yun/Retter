import types from "../types";

export const setSelector = (nextSelector) => {
  return {
    type: types.SET_SELECTOR,
    nextSelector,
  };
};
