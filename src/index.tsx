import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import "antd/dist/antd.less"; // 通过less的css变量自定义antd里面的主题
import { AuthProvider } from "context";
loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      {/* 订阅context */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
