import React from "react";
import Logo from "../../images/logo-sos-gatinhos.png";
import "../../components/Sidebar/Sidebar.css";
import { MdAddCircle } from "react-icons/md";
import { MdPets } from "react-icons/md";
import { MdVolunteerActivism } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineSetting, AiOutlineLeft } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { TiGroupOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import GatinhosModal from "../Gatinhos/GatinhosModal/GatinhosModal";
import { useModal } from "../../contexts/ModalContext";
import { toast } from "react-toastify";
import axios from "axios";

function Sidebar({ definirComponente, componenteAtivo }) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  const handleAddGato = async (newGato) => {
    delete newGato["_id"];
    try {
      const { data } = await axios.post(
        "http://localhost:4000/gatos",
        newGato,
        {
          withCredentials: true,
        }
      );
      if (!data.created) {
        toast.error(
          data.error
            ? data.error
            : "Houve um erro ao adicionar um novo gato 😿",
          {
            theme: "dark",
          }
        );
        closeModal();
      } else {
        toast(`Gatinho adicionado com sucesso! 😽`, {
          theme: "dark",
        });
        closeModal();
      }
    } catch {
      toast.error("Houve um erro ao adicionar um novo gato", {
        theme: "dark",
      });
      closeModal();
    }
  };
  const abrirAddGato = () => {
    openModal(
      "Adicionar gato",
      <GatinhosModal handleSubmitFunction={handleAddGato} edit={true} />
    );
  };

  return (
    <div className="sidebar">
      <div className="content">
        <div className="logoContainer">
          <img src={Logo} alt="logo" width="113px" height="113px" />
        </div>
        <div className="botoes">
          <button
            className="btnSidebar"
            onClick={abrirAddGato}
          >
            <MdAddCircle
              size={23}
              style={{
                color: "#0d992e",
              }}
            />
            <span>Novo gato</span>
          </button>
        </div>
        <div className="contentsContainer">
          <ul>
            <li>
              {componenteAtivo !== "dashboard" ? (
                <>
                  <RxDashboard />
                  <a onClick={() => definirComponente("dashboard")}>
                    Dashboard
                  </a>
                </>
              ) : (
                <button
                  className="btnSidebar2"
                  onClick={() => definirComponente("dashboard")}
                >
                  <RxDashboard size={19} />
                  <span>Dashboard</span>
                </button>
              )}
            </li>
            <li>
              {componenteAtivo !== "gatinhos" ? (
                <>
                  <MdPets />
                  <a onClick={() => definirComponente("gatinhos")}>
                  Gatinhos
                  </a>
                </>
              ) : (
                <button
                  className="btnSidebar2"
                  onClick={() => definirComponente("gatinhos")}
                >
                  <MdPets size={19} />
                  <span>Gatinhos</span>
                </button>
              )}
            </li>
            <li>
              {componenteAtivo !== "adotantes" ? (
                <>
                  <MdVolunteerActivism />
                  <a onClick={() => definirComponente("adotantes")}>
                  Adotantes
                  </a>
                </>
              ) : (
                <button
                  className="btnSidebar2"
                  onClick={() => definirComponente("adotantes")}
                >
                  <MdVolunteerActivism size={19} />
                  <span>Adotantes</span>
                </button>
              )}
            </li>
            <li>
              {componenteAtivo !== "adocoes" ? (
                <>
                  <BsListCheck />
                  <a onClick={() => definirComponente("adocoes")}>
                  Adoções
                  </a>
                </>
              ) : (
                <button
                  className="btnSidebar2"
                  onClick={() => definirComponente("adocoes")}
                >
                  <BsListCheck size={19} />
                  <span>Adoções</span>
                </button>
              )}
            </li>
            <li>
              {componenteAtivo !== "users" ? (
                <>
                  <TiGroupOutline />
                  <a onClick={() => definirComponente("users")}>
                  Usuários
                  </a>
                </>
              ) : (
                <button
                  className="btnSidebar2"
                  onClick={() => definirComponente("users")}
                >
                  <TiGroupOutline size={19} />
                  <span>Usuários</span>
                </button>
              )}
            </li>
            <li>
              {componenteAtivo !== "configuracoes" ? (
                <>
                  <AiOutlineSetting />
                  <a onClick={() => definirComponente("configuracoes")}>
                  Configurações
                  </a>
                </>
              ) : (
                <button
                  className="btnSidebar2"
                  onClick={() => definirComponente("configuracoes")}
                >
                  <AiOutlineSetting size={19} />
                  <span>Configurações</span>
                </button>
              )}
            </li>
          </ul>
        </div>
        <button className="btnSair" onClick={logOut}>
          <AiOutlineLeft
            size={23}
            style={{
              color: "black",
            }}
          />
          Sair
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
