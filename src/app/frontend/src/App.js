import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Home from "./pages/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie"; // Import useCookies hook
import Sidebar from "./components/Sidebar/Sidebar";
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','), // Use 'Inter' as the font family
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}
