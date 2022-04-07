/** root reducers */
import { combineReducers } from "redux";
import cardReducer from "./cardReducer";
import selectorReducer from "./selectorReducer";

const rootReducer = combineReducers({
  // 여기에 reducers들을 추가
  cardReducer,
  selectorReducer,
});

export default rootReducer;
