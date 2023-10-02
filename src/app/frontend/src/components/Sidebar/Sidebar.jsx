import React from "react";
import Logo from "../../images/logo-sos-gatinhos.png";
import "../../components/Sidebar/Sidebar.css";
import { MdAddCircle } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineSetting, AiOutlineLeft } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { TiGroupOutline } from "react-icons/ti";
import { VscBriefcase } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Sidebar({definirComponente}) {
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
        {/* <div className="burgerContainer">
          <AiOutlineLeft
            size={23}
            style={{
              color: "black",
            }}
          />
        </div> */}
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

          <button className="btnSidebar2">
            <RxDashboard size={19} />
            <span>Dashboard</span>
          </button>
        </div>
        <div className="contentsContainer">
          <ul>
            <li>
              <VscBriefcase />
              <a onClick={() => definirComponente("gatinhos")}>Gatinhos</a>
            </li>
            <li>
              <BsListCheck />
              <a onClick={() => definirComponente("adocoes")}>Adoções</a>
            </li>
            <li>
              <RxDashboard />
              <a onClick={() => definirComponente("dashboard")}>Dashboard</a>
            </li>

            <li>
              <TiGroupOutline />
              <a onClick={() => definirComponente("users")}>Users</a>
            </li>
            <li>
              <AiOutlineSetting />
              <a onClick={() => definirComponente("configuracoes")}>Configurações</a>
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
