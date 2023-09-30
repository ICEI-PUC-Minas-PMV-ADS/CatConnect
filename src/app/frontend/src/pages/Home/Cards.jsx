import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useModal } from "../../contexts/ModalContext";

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { modalState, openModal, closeModal } = useModal();
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
        } else
          toast(`Olá ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const abrirModal = () => {
    openModal("Teste modal", <h1>THIS IS A TEST MODAL</h1>)
  }
  return (
    <>
      <div className="private">
        <h1>Home</h1>
        <button onClick={abrirModal}>Abrir modal</button>
        <button onClick={logOut}>Sair</button>
      </div>
    </>
  );
}
