import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  color: #333333;
  font-size: 16px;
}

.full-page-container-center {
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.preloader-preview-area {
  width: 100%;
  height: 100px;
  background: url(https://waat.fr/wp-content/uploads/2018/05/logo-waat-w-animated.svg) no-repeat center center;
}
`;
