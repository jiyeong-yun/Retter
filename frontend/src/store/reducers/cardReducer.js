import types from "../types";

const initialState = {
  id: "",
  audio: "",
  isRecorded: false,
  menuVisible: {
    sticker: false,
    background: false,
    text: false,
  },
  background: {
    color: "white",
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
        menuVisible: { ...state.menuVisible },
        background: { ...state.background },
        stickers: state.stickers.map((sticker) => sticker),
        text: {
          ...state.text,
          message: action.message,
        },
      };
    }

    case types.SET_TEXT_ISVISIBLE: {
      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: { ...state.background },
        stickers: state.stickers.map((sticker) => sticker),
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
        background: { ...state.background },
        stickers: state.stickers.map((sticker) => sticker),
        text: { ...state.text },
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
        background: { ...state.background },
        stickers: state.stickers.map((sticker) => sticker),
        text: { ...state.text },
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
        background: { ...state.background },
        stickers: state.stickers.map((sticker) => sticker),
        text: { ...state.text },
      };
    }

    case types.SET_BACKGROUND_COLOR: {
      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: {
          color: action.color,
          image: "",
        },
        stickers: state.stickers.map((sticker) => sticker),
        text: { ...state.text },
      };
    }

    case types.SET_BACKGROUND_IMAGE: {
      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: {
          color: "white",
          image: action.imageURL,
        },
        stickers: state.stickers.map((sticker) => sticker),
        text: { ...state.text },
      };
    }

    case types.REMOVE_BACKGROUND: {
      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: {
          color: "white",
          image: "",
        },
        stickers: state.stickers.map((sticker) => sticker),
        text: { ...state.text },
      };
    }

    case types.ADD_STICKER: {
      const newStickers = state.stickers.map((sticker) => sticker);
      const sticker = {
        id: action.id,
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        rotate: 0,
        scale: 1,
      };
      newStickers.splice(action.index, 0, sticker);

      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: { ...state.background },
        stickers: newStickers,
        text: { ...state.text },
      };
    }

    case types.REMOVE_STICKER: {
      const newStickers = state.stickers.filter(
        (sticker, index) => index !== action.index
      );
      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: { ...state.background },
        stickers: newStickers,
        text: { ...state.text },
      };
    }

    case types.SET_STICKER_POS: {
      const newStickers = state.stickers.map((sticker) => sticker);
      newStickers[action.index].x = action.x;
      newStickers[action.index].y = action.y;
      return {
        ...state,
        stickers: newStickers,
      };
    }

    case types.SET_STICKER_SCALE: {
      const newStickers = state.stickers.map((sticker) => sticker);
      newStickers[action.index].scale = action.scale;
      return {
        ...state,
        stickers: newStickers,
      };
    }

    case types.SET_CARD_ID: {
      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: { ...state.background },
        stickers: state.stickers.map((sticker) => sticker),
        text: { ...state.text },
        id: action.id.replace(/-/g, ""),
        audio: action.audio,
        isRecorded: action.isRecorded,
      };
    }

    case types.RESET_CARD: {
      return {
        id: "",
        menuVisible: {
          sticker: false,
          background: false,
          text: false,
        },
        background: {
          color: "white",
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
    }

    case types.SET_TEXT_POS: {
      const nextText = {
        ...state.text,
        x: action.x,
        y: action.y,
      };
      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: { ...state.background },
        stickers: state.stickers.map((sticker) => sticker),
        text: nextText,
      };
    }
    default:
      return state;
  }
};

export default cardReducer;
