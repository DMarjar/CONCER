import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div style={{ height: "100vh" }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>
);
