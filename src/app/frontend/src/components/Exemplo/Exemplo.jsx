import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useModal } from "../../contexts/ModalContext";
import AdicionarAdocaoTemplate from "../../utils/modal/ModalTemplates/AdicionarAdocao/AdicionarAdocaoTemplate";
import ModalDeExemplo from "../../utils/modal/ModalTemplates/ModalDeExemplo/ModalExemploTemplate";
import "./Exemplo.css";

export default function Exemplo({definirComponente}) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { openModal, closeModal } = useModal();
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {

          toast(`Olá ${data.user} 🦄`, {
            theme: "dark",
          });
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const abrirModal = () => {
    openModal("Adicionar adoção", AdicionarAdocaoTemplate({ closeModal }));
  };

  const abrirModalExemplo = () => {
    openModal("Modal de exemplo", ModalDeExemplo({ closeModal }));
  };

  return (
      <div className="container">
        <h1>Home</h1>
        <button onClick={abrirModal}>Abrir modal</button>
        <button onClick={abrirModalExemplo}>Abrir modal de exemplo</button>
        <button onClick={() => definirComponente("gatinhos")}>
            Página dos Gatinhos
        </button>
        <button onClick={logOut}>Sair</button>
      </div>
  );
}
