import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useModal } from "../../contexts/ModalContext";
import AddGato from "./AddGato/AdicionarGato";

export default function Gatinhos() {
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
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);
  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const abrirAddGato = () => {
    openModal("Adicionar gato", AddGato({closeModal}))
  }


  return (
    <>
      <div className="private">
        <h1>Gatinhos</h1>
        <button onClick={abrirAddGato}>Adicionar gato</button>
        <button onClick={logOut}>Sair</button>
      </div>
    </>
  );
}
