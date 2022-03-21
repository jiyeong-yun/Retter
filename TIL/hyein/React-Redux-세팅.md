# React-Redux 세팅

## Re:tter의 디렉토리 구조

```bash
src
├── store
│   ├── actions
│   └── reducers
│   └── types.js
│
└ App.js, index.js, ...
```

- Redux 개념을 잘 모르겠다면

  - [Redux Fundamentals](https://github.com/HyeIn-Kim/TIL/blob/main/Redux/Redux-Fundamentals.md)
  - [React Redux](https://github.com/HyeIn-Kim/TIL/blob/main/Redux/React-Redux-%EC%83%9D%ED%99%9C%EC%BD%94%EB%94%A9.md)
  - 를 봐줘!

- store: Redux store에 관련된 파일들이 들어있는 폴더
- actions: `action` 파일들이 들어있는 폴더
- reducers: `reducer` 파일들이 들어있는 폴더
- `types.js`: `action`에 들어갈 type들을 정의해 놓은 파일 (오타 방지를 위해 만듦)

## 1. Reducer를 만들자!

```javascript
// src/store/reducer/cardReducer.js

import types from "../types";

// Reducer의 state (초기값)
const cardState = {
  message: "",
};

const cardReducer = (state = cardState, action) => {
  // switch~case로 action에 따라 state를 변경한다.
  switch (action.type) {
    case types.SET_MESSAGE:
      const message = action.message;
      return { ...state, message };

    // 변화가 없을 때는 현재 state를 그대로 갱신
    default:
      return state;
  }
};

export default cardReducer;
```

- 그러나... **Reducer는 딱 1개만 사용할 수 있다.**
- 그런데 하나의 파일에 모든 페이지의 Reducer를 작성하면...? 파일이 길어지고 읽기가 힘들어진다.
  - Reducer를 분리하자!
  - 기능별로 분리된 Reducer들을 하나로 합쳐줄(combine) 필요가 있음.
  - `combineReducer`를 사용하여 하나로 합친다.

```javascript
// src/store/reducers/index.js

import { combineReducers } from "redux";
// 사용할 Reducer들을 import하고
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
  // 여기에 reducers들을 추가하면 합쳐진다.
  cardReducer,
});

export default rootReducer;
```

## 2. Action은 뭔가요?

- Reducer야 `○○ 행동을 해줘!` 하고 알려주는 역할.
- 그러나 평범한 JSON입니다. (함수로 작성한다면 return값은 JSON으로 작성해야 함.)

```javascript
// src/store/actions/cardActions.js
import types from "../types";

export const setMessage = (message) => {
  return {
    type: types.SET_MESSAGE,
    message,
  };
};
```

- Reducer야 `인자로 들어온 새 메세지로 store를 갱신해줘!`

## 3. Store 만들기

- Action과 Reducer를 작성했다면, Store를 만들자.

```javascript
// src/index.js

/** Redux Settings */
// 필요한 module들을 import하고...
import logger from "redux-logger";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers";

// Redux Logger 설정
// 배포 레벨에서는 Redux Logger를 사용하지 않음
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(logger));

// createStore로 store를 만들어 준다.
const store = createStore(rootReducer, enhancer);

// Provider에 props로 store를 넘겨주면, 하위 컴포넌트들에서도 store를 사용할 수 있어!
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

![Redux-Logger](https://user-images.githubusercontent.com/25563077/157600204-216c96a5-c613-421f-878e-f0d4a7e62849.png)

- Redux Logger를 사용하면 state가 변경될 때마다 로그를 볼 수 있다.

## 4. 설정 끝, 진짜 사용해보자 with Wrapper

### wrapper를 사용하는 이유

- Redux store를 사용하면 컴포넌트는 Redux store에 종속되게 됨
- 아~ 다른 곳에서 쓰고 싶은데! 재사용이 힘들어짐
- 그래서 `container div`처럼 `wrapper component`로 감싸준다.
- Store 접근은 wrapper가 하고, 나는 props로 간편하게 받아서 사용하면 OK!

### 실제 사용 예시

```javascript
import { connect } from "react-redux";
import { setMessage } from "../../store/actions/cardActions";

function mapStateToProps({ cardReducer }) {
  return {
    message: cardReducer.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMessage: (message) => dispatch(setMessage(message)),
  };
}

export default connect(null, mapDispatchToProps)(Message);

// 위 JSON에서 정의한 속성들을 props로 받아서 쓰자!
function Message({ message, setMessage }) {
  // return jsx here
}
```

- `connect`를 import하고

```javascript
export default connect(mapStateToProps, mapDispatchToProps)(component);
```

- 첫번째 인자 `mapStateToProps`: Redux Store의 `state`를 props로 변환시켜주는 함수
  - 필요 없을 경우 인자를 `null`로 전달
  - `connect(null, mapDispatchToProps)(component);`
- 두번째 인자 `mapDispatchToProps`: Redux store의 `dispatch`를 props로 변환시켜주는 함수
  - 필요 없을 경우 javascript 특성 상 `인자 생략 가능`
  - `connect(mapStateToProps)(component)`
