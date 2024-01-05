import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StyleProvider } from "@ant-design/cssinjs";
import { App as AntApp } from "antd";

import App from "./App";
import store from "./store";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StyleProvider hashPriority="high">
          <AntApp>
            <App />
          </AntApp>
        </StyleProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
