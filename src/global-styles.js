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
`;
