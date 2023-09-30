import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Cards from "./pages/Home/Cards";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<Cards />} />
      </Routes>
    </BrowserRouter>
  );
}
