import React from 'react';
import "../Dashboard/Dashboard.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BsListCheck, BsBarChart, BsChevronDown } from "react-icons/bs";
import gatinho1 from "../../images/gatinho1.png";
import { Avatar } from '@mui/material';
import DashboardAdocoesCount from './DashboardAdocoesCount';


const Dashboard = ({ adocoesCount }) => {
  return (
    <Box>
      <h1> Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <div className="ResumoBox">
              <div className="subtitulo">
                <span>Resumo</span>
              </div>
              <div >
                <button className="btnFiltro" >
                  <p>Último mês</p>
                  <BsChevronDown
                    size={15}
                    style={{
                      color: "black",
                    }}
                  />
                </button>
              </div>
            </div>
            <div className="divs">
              <div className="div1">
                <Avatar style={{
                  backgroundColor: "#910470"
                }}>
                  < BsBarChart
                    size={23}
                    style={{
                      color: "#ffffff",
                      borderRadius: "0.2rem",
                    }} />
                </Avatar>
                <span>Novos gatos registrados</span>
                <span>8</span>
                <span>12% de aumento</span>
              </div>

              <div className="div2">
              <Avatar style={{
                  backgroundColor: "#E65F2B"
                }}>
                <BsListCheck
                  size={23}
                  style={{
                    color: "#ffffff",
                    borderRadius: "0.2rem",
                  }} />
                  </Avatar>
                <span>Adoções em acompanhamento</span>
                <DashboardAdocoesCount count={adocoesCount} />
              </div>
            </div>
          </Grid>

          <Grid item xs={8}>
            <div className="cards">
              <div>
                <div className="subtitulo">
                  <span>Últimos registros</span>
                </div>
                <div>
                  <button className="btnFiltro" >
                    <p>Local de encontro</p>
                    <BsChevronDown
                      size={15}
                      style={{
                        color: "black",
                      }}
                    />
                  </button>
                  <button className="btnFiltro" >
                    <p>Status</p>
                    <BsChevronDown
                      size={15}
                      style={{
                        color: "black",
                      }}
                    />
                  </button>
                </div>
              </div>
              <div className="card">
                <img src={gatinho1} alt="gatinho1" width="120px" height="120px" />
                <p>Sôsô</p>
              </div>
              <div className="card">
                <img src={gatinho1} alt="gatinho1" width="120px" height="120px" />
                <p>Barbie</p>
              </div>
              <div className="card">
                <img src={gatinho1} alt="gatinho1" width="120px" height="120px" />
                <p>Áries</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={8}>
            <p>Grid3</p>
          </Grid>

          <Grid item xs={4}>
            <p>Grid4</p>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
};

export default Dashboard;