import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// Re:tter 전체에 적용해야 할 style은 이곳에 작성해 주세요.
// todo: 웹폰트 설정
const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }

    body {
        background-color: #EAE2B1;
    }

    a {
        text-decoration: none;
    }
`;

export default GlobalStyle;
