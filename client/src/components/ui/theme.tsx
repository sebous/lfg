import { createGlobalStyle } from "styled-components";

export const theme = Object.freeze({
  color: {
    primary: "#119da4",
    secondary: "#0c7489",
    danger: "#c23142",
    background: "#202c39",
    backgroundLight: "#2D4154",
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
    overflow: hidden;
  };
  h1,h2,h3,h4,h5, input {
    font-family: 'PT Sans', sans-serif;
  };
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
}

.ReactModal__Overlay--after-open{
    opacity: 1;
}

.ReactModal__Overlay--before-close{
    opacity: 0;
}
`;
