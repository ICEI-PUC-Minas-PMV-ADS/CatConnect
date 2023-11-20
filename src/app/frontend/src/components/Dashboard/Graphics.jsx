import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { routes } from "../../utils/api/ApiRoutes";

const Graphics = () => {
  const [gatos, setGatos] = useState([]);
  const [adocoes, setAdocoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    let countGatos = 0;
    let countAdocoesPendentes = 0;
    let countAdocoesConcluidas = 0;
    let countGatosEmAndamento = 0;
    try {
      await axios
        .get(routes.getGatos, {
          withCredentials: true,
        })
        .then((data) => {
          setGatos(data.data);
          countGatos = data.data.length;
        });

      await axios
        .get(routes.getAdocoes, {
          withCredentials: true,
        })
        .then((data) => {
          setAdocoes(data.data);
          countAdocoesPendentes = data.data.filter(
            (adocao) => adocao.status === "pendente"
          ).length;
          countAdocoesConcluidas = data.data.filter(
            (adocao) => adocao.status === "concluido"
          ).length;
          countGatosEmAndamento = data.data.filter(
            (adocao) => adocao.status === "em andamento"
          ).length;
        });

      setChartData((prevChartData) => ({
        ...prevChartData,
        series: [
          { name: "Gatos Cadastrados", data: [countGatos, 0, 0, 0] },
          {
            name: "Adoções Concluídas",
            data: [0, countAdocoesConcluidas, 0, 0],
          },
          { name: "Adoções Pendentes", data: [0, 0, countAdocoesPendentes, 0] },
          {
            name: "Adoções em Andamento",
            data: [0, 0, 0, countGatosEmAndamento],
          },
        ],
      }));
      setLoading(false);
    } catch (error) {
      setError("Erro ao buscar dados da API");
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  const [chartData, setChartData] = useState({
    categories: [
      "Gatos Cadastrados",
      "Adoções Concluídas",
      "Adoções Pendentes",
      "Adoções em Andamento",
    ],
    series: [
      { name: "Gatos Cadastrados", data: [0, 0, 0, 0] },
      { name: "Adoções Concluídas", data: [0, 0, 0, 0] },
      { name: "Adoções Pendentes", data: [0, 0, 0, 0] },
      { name: "Adoções em Andamento", data: [0, 0, 0, 0] },
    ],
  });

  return (
    <div className="grafico-resumo">
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <BarChart
          xAxis={[{ scaleType: "band", data: chartData.categories }]}
          series={chartData.series}
          width={900}
          height={200}
        />
      )}
    </div>
  );
};
export default Graphics;
