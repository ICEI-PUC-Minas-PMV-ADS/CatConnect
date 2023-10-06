import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";
import Exemplo from "../../components/Exemplo/Exemplo";
import Gatinhos from "../../components/Gatinhos/PgGatinhos";
import Adocoes from "../../components/Adocoes/Adocoes";
import Dashboard from "../../components/Dashboard/Dashboard";
import Users from "../../components/Users/User";
import Configuracoes from "../../components/Configuracoes/Configuracoes";
import Adotantes from "../../components/Adotantes/Adotantes";
import Loading from "../../utils/Loading/generic";
import {data} from "autoprefixer";

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [component, setComponent] = useState("Exemplo");

  const definirComponente = () => {
    // Ao invés de colocar o componente no caminho (routes) , colocar o componente a ser renderizado aqui
    switch (component) {
      case "Exemplo":
        return <Exemplo definirComponente={setComponent} />;
      case "gatinhos":
        return <Gatinhos />;
      case "adocoes":
        return <Adocoes />;
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <Users />;
      case "configuracoes":
        return <Configuracoes />;
      case "adotantes":
        return <Adotantes />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Mostra o loading
        setLoading(true);

        const { data } = await axios.post(
            "http://localhost:4000",
            {},
            { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          setTimeout(() => {

            toast(`Olá ${data.user} 🦄`, { theme: "dark" });
          }, 3000);

        }
      } catch (error) {
        console.error("Erro durante a verificação do usuário", error);
      } finally {
        // Esconde o loading após 3 segundos
        setTimeout(() => {
          setLoading(false);
        }, 2000);

      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  return (

      <div className="home-container">
        {loading && <Loading />} {/* Mostra o loading enquanto loading é true */}
        {!loading && (
            <>
              <Sidebar className="sidebar" definirComponente={setComponent} />
              <div className="private">{definirComponente()}</div>
            </>
        )}
      </div>
  );
}
