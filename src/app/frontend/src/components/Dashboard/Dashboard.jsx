import React, { useEffect } from "react";
import "../Dashboard/Dashboard.css";
import TableRegistrosGatos from "./TableRegistrosGatos.jsx";
import TableRegistrosAdocoes from "./TableRegistrosAdocoes";
import CardsResumo from "./CardsResumo";
import Graphics from "./Graphics";

const Dashboard = () => {
  return (
    <div className="flex-column">
      <CardsResumo />
      <Graphics />
        <div className="adocoes-gato">
          <div className="text-wrapper">Ultimos Registros de Adoções</div>
          <div className="div-gatos">
            <TableRegistrosAdocoes />
          </div>
        </div>
        <div className="adocoes-gato">
          <div className="text-wrapper">Ultimos Registros de Gatos</div>
          <div className="div-gatos">
            <TableRegistrosGatos />
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
