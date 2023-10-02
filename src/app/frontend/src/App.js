import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Cards from "./pages/Home/Cards";
import Dashboard from "./pages/Dashboard/Dashboard";
import NovoGato from "./pages/NovoGato/NovoGato";
import Registros from "./pages/Registros/Registros";
import Adocoes from "./pages/Adocoes/Adocoes";
import Users from "./pages/Users/User";
import Configuracoes from "./pages/Configuracoes/Configuracoes";
import Gatinhos from "./pages/Gatinhos/PgGatinhos";
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
  const [cookies] = useCookies();

  return (
    <ThemeProvider theme={theme}>
    <div className="app-container">
      {cookies.jwt && window.location.pathname !== "/login" && <Sidebar />}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Cards />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/novoGato" element={<NovoGato />} />
          <Route path="/registros" element={<Registros />} />
          <Route path="/adocoes" element={<Adocoes />} />
          <Route path="/users" element={<Users />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/Gatinhos" element={<Gatinhos />} />
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}
