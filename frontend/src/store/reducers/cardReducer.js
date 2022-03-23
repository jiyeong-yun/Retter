import types from "../types";

const initialState = {
  menuVisible: {
    sticker: false,
    background: false,
    text: false,
  },
  background: {
    color: "transparent",
    image: "",
  },
  stickers: [],
  text: {
    message: "",
    isVisible: true,
    x: 50,
    y: 50,
  },
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MESSAGE: {
      return {
        ...state,
        text: {
          ...state.text,
          message: action.message,
        },
      };
    }

    case types.SET_TEXT_ISVISIBLE: {
      return {
        ...state,
        text: {
          ...state.text,
          isVisible: !state.text.isVisible,
        },
      };
    }

    case types.SET_MENU_STICKER_ISVISIBLE: {
      return {
        ...state,
        menuVisible: {
          sticker: !state.menuVisible.sticker,
          background: false,
          text: false,
        },
      };
    }

    case types.SET_MENU_BACKGROUND_ISVISIBLE: {
      return {
        ...state,
        menuVisible: {
          sticker: false,
          background: !state.menuVisible.background,
          text: false,
        },
      };
    }

    case types.SET_MENU_TEXT_ISVISIBLE: {
      return {
        ...state,
        menuVisible: {
          sticker: false,
          background: false,
          text: !state.menuVisible.text,
        },
      };
    }

    case types.SET_BACKGROUND_COLOR: {
      return {
        ...state,
        background: {
          color: action.color,
          image: "",
        },
      };
    }

    case types.ADD_STICKER: {
      return {
        ...state,
        stickers: [
          ...state.stickers,
          {
            id: action.id,
            x: 100,
            y: 100,
            width: 50,
            height: 50,
            rotate: 0,
          },
        ],
      };
    }

    case types.REMOVE_STICKER: {
      const newStickers = state.stickers.splice(action.index, 1);
      return {
        ...state,
        stickers: newStickers,
      };
    }

    case types.SET_STICKER_POS: {
      const newStickers = [...state.stickers];
      newStickers[action.index].x = action.x;
      newStickers[action.index].y = action.y;
      return {
        ...state,
        stickers: newStickers,
      };
    }
    default:
      return state;
  }
};

export default cardReducer;
