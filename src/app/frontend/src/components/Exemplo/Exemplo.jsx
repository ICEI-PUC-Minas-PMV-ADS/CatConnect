import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useModal } from "../../contexts/ModalContext";
import AdicionarAdocaoTemplate from "../../utils/modal/ModalTemplates/AdicionarAdocao/AdicionarAdocaoTemplate";
import ModalDeExemplo from "../../utils/modal/ModalTemplates/ModalDeExemplo/ModalExemploTemplate";
import "./Exemplo.css";

export default function Exemplo({definirComponente}) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { openModal, closeModal } = useModal();

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
