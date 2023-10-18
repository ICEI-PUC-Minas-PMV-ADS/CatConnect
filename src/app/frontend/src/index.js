import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "./contexts/ModalContext";
import Modal from "./utils/modal/Modal";


ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
      <ToastContainer />
      <Modal />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
