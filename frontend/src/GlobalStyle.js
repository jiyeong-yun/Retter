import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// Re:tter 전체에 적용해야 할 style은 이곳에 작성해 주세요.
const GlobalStyle = createGlobalStyle`
    ${reset}

    // Web Fonts Settings
    // Google Webfonts Helper https://google-webfonts-helper.herokuapp.com/fonts
    /* noto-sans-kr-regular - latin_korean */
    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        src: url('/fonts/noto-sans-kr-v25-latin_korean-regular.eot'); /* IE9 Compat Modes */
        src: local(''),
            url('/fonts/noto-sans-kr-v25-latin_korean-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
            url('/fonts/noto-sans-kr-v25-latin_korean-regular.woff2') format('woff2'), /* Super Modern Browsers */
            url('/fonts/noto-sans-kr-v25-latin_korean-regular.woff') format('woff'), /* Modern Browsers */
            url('/fonts/noto-sans-kr-v25-latin_korean-regular.ttf') format('truetype'), /* Safari, Android, iOS */
            url('/fonts/noto-sans-kr-v25-latin_korean-regular.svg#NotoSansKR') format('svg'); /* Legacy iOS */
    }

    /* gowun-batang-regular - latin_korean */
    @font-face {
      font-family: 'Gowun Batang';
      font-style: normal;
      font-weight: 400;
      src: url('/fonts/gowun-batang-v5-latin_korean-regular.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('/fonts/gowun-batang-v5-latin_korean-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('/fonts/gowun-batang-v5-latin_korean-regular.woff2') format('woff2'), /* Super Modern Browsers */
           url('/fonts/gowun-batang-v5-latin_korean-regular.woff') format('woff'), /* Modern Browsers */
           url('/fonts/gowun-batang-v5-latin_korean-regular.ttf') format('truetype'), /* Safari, Android, iOS */
           url('/fonts/gowun-batang-v5-latin_korean-regular.svg#GowunBatang') format('svg'); /* Legacy iOS */
    }

    /* gowun-batang-700 - latin_korean */
    @font-face {
      font-family: 'Gowun Batang';
      font-style: normal;
      font-weight: 700;
      src: url('/fonts/gowun-batang-v5-latin_korean-700.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('/fonts/gowun-batang-v5-latin_korean-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('/fonts/gowun-batang-v5-latin_korean-700.woff2') format('woff2'), /* Super Modern Browsers */
           url('/fonts/gowun-batang-v5-latin_korean-700.woff') format('woff'), /* Modern Browsers */
           url('/fonts/gowun-batang-v5-latin_korean-700.ttf') format('truetype'), /* Safari, Android, iOS */
           url('/fonts/gowun-batang-v5-latin_korean-700.svg#GowunBatang') format('svg'); /* Legacy iOS */
    }

    * {
        box-sizing: border-box;

    }

    body {
        background-color: #EAE2B1;
        font-family: 'Noto Sans KR', 'Gowun Batang', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    }

    button {
        border: none;
        cursor: pointer;
        background-color: transparent;
        font-family: 'Noto Sans KR', 'Gowun Batang', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    }
`;

export default GlobalStyle;
