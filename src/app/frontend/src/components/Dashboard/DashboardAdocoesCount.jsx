import React from 'react';
import "../Dashboard/Dashboard.css";

const DashboardAdocoesCount = ({ count }) => {
    return (
        <div>
        <h2> Contagem de Adoções: {count} </h2>
        </div>

    );
};

export default DashboardAdocoesCount;