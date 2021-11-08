import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthService from "./service/auth";
import AuctionService from "./service/auction";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthErrorEventBus } from "./context/AuthContext";
import HttpClient from "./network/http";
import TokenStorage from "./db/token";
import Socket from "./network/socket";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const authService = new AuthService(httpClient, tokenStorage);
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const auctionService = new AuctionService(httpClient, tokenStorage, socketClient);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
        <App auctionService={auctionService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);