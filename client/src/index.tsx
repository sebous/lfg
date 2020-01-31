import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "reset-css";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
