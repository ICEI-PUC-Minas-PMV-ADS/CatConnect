import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Cards from "./pages/Home/Cards";
import Dashboard from "./pages/Dashboard";
import NovoGato from "./pages/NovoGato";
import Registros from "./pages/Registros/Registros";
import Adocoes from "./pages/Adocoes";
import Users from "./pages/Users";
import Configuracoes from "./pages/Configuracoes/Configuracoes";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<Cards />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/novoGato" element={<NovoGato />} />
        <Route exact path="/registros" element={<Registros />} />
        <Route exact path="/adocoes" element={<Adocoes />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/configuracoes" element={<Configuracoes />} />

      </Routes>
    </BrowserRouter>
  );
}
