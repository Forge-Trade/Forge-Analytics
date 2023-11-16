import { createGlobalStyle } from "@nfront/global-styles";

const GlobalStyle = createGlobalStyle`
  html {
    background: #0d0e0e;
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    min-height: 100vh;
    overflow-x: clip;

    background-color: #0d0e0e;
  }
  @media only screen and (max-width: 930px) {
    body {
      background-color: #0d0e0e;
      background-attachment: fixed;
    }
  }
  @media only screen and (max-width: 576px) {
    body {
      background-color: #0d0e0e;
    }
  }

  /* Override CSS */
  .apexcharts-gridline {
    stroke-width: 1px;
    stroke: #333;
  }

  *[data-for="il"] {
    cursor: help;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .thumb-red-0,
  .thumb-red-1 {
    background-color: rgb(247, 2, 119) !important;
  }
  .thumb-green-0,
  .thumb-green-1 {
    background-color: rgba(37, 175, 96, 1) !important;
  }
  .thumb-yellow-0,
  .thumb-yellow-1 {
    background-color: #fccc5d !important;
  }
`;

export default GlobalStyle;
