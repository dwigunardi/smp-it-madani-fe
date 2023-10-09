import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";
import MainRoute from "../src/routes/mainRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClient } from "./config/google";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // <GoogleOAuthProvider clientId={googleClient.web.client_id} onScriptLoadError={(e) => console.log(e)}>
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
    // </GoogleOAuthProvider>
  // </React.StrictMode>
);
