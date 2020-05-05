import { createGlobalStyle } from "styled-components";

export const theme = Object.freeze({
  color: {
    primary: "#119da4",
    secondary: "#0c7489",
    background: "#202c39",
    gray: "#3E505B",
    light: "#D7D9CE",
    text: "255,255,255,0.8",
  },
  font: "'PT Sans', sans-serif",
});

export const GlobalStyles = createGlobalStyle`
  body, html {
    font-family: 'PT Sans', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: rgba(255,255,255,0.8);
  }
`;
