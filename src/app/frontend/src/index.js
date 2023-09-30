import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ToastContainer, toast } from "react-toastify";


ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);

