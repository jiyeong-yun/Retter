/** root reducers */
import { combineReducers } from "redux";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
  // 여기에 reducers들을 추가
  cardReducer,
});

export default rootReducer;
