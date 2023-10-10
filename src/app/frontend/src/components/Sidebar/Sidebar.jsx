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

function Sidebar({ definirComponente, componenteAtivo }) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
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
            onClick={() => definirComponente("gatinhos")}
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
