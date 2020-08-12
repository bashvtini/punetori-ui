import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/main.css";

window.API_URL = "https://punetori.herokuapp.com/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
