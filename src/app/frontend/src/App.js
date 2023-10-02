import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Home from "./pages/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie"; // Import useCookies hook
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
  const [cookies] = useCookies();

  return (
    <div className="app-container">
      {cookies.jwt && window.location.pathname !== "/login" && <Sidebar />}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
