import React from 'react';
import Logo from "../../images/logo-sos-gatinhos.png"
import "../../components/Sidebar/Sidebar.css"
import { MdAddCircle } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineSetting, AiOutlineLeft } from 'react-icons/ai';
import { BsListCheck } from 'react-icons/bs';
import { TiGroupOutline } from 'react-icons/ti';
import { VscBriefcase } from 'react-icons/vsc';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logoContainer">
                <img src={Logo} alt="logo"
                    width="113px"
                    height="113px"
                />
            </div>
            <div className="burgerContainer">
                < AiOutlineLeft
                size={23} 
                style={{
                    color: 'black',
                 }} 
                  />
            </div>
            <div  >
                <button className="btnSidebar">
                    < MdAddCircle 
                    size={23} 
                    style={{
                        color:'#0d992e',
                     }} 
                     />
                    <text>Novo gato</text>
                </button>

                <button className="btnSidebar2">
                    < RxDashboard size={19} />
                    < text>Dashboard</text>
                </button>
            </div>
            <div className="contentsContainer">
                <ul>

                    <li>
                        < VscBriefcase/>
                        <a href="/gatinhos">Gatinhos</a>
                    </li>
                    <li>
                        < BsListCheck />
                        <a href="/adocoes">Adoções</a>
                    </li>
                    <li>
                        < RxDashboard />
                        <a href="/dashboard">Dashboard</a>
                    </li>

                    <li>
                        < TiGroupOutline />
                        <a href="/users">Users</a>
                    </li>
                    <li>
                        < AiOutlineSetting />
                        <a href="/configuracoes">Configurações</a>
                    </li>
                </ul>
            </div>


        </div>

    );
}

export default Sidebar;
