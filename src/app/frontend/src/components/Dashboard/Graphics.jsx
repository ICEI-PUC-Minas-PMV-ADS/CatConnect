import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
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
        try {
            const gatosData = await axios.get(routes.getGatos, {
                withCredentials: true,
            });
            setGatos(gatosData.data);

            const adocoesData = await axios.get(routes.getAdocoes, {
                withCredentials: true,
            });
            setAdocoes(adocoesData.data);


            // Atualizar os dados do gráfico
            setChartData(prevChartData => ({
                ...prevChartData,
                series: [
                    { name: 'Gatos Cadastrados', data: [countGatos(), 0, 0, 0] },
                    { name: 'Adoções Concluídas', data: [0, countAdocoesConcluidas(), 0, 0] },
                    { name: 'Adoções Pendentes', data: [0, 0, countAdocoesPendentes(), 0] },
                    { name: 'Adoções em Andamento', data: [0, 0, 0, countGatosEmAndamento()] },
                ],
            }));
            setLoading(false);
        } catch (error) {

            setError('Erro ao buscar dados da API');
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const [chartData, setChartData] = useState({
        categories: ['Gatos Cadastrados', 'Adoções Concluídas', 'Adoções Pendentes', 'Adoções em Andamento'],
        series: [
            { name: 'Gatos Cadastrados', data: [0, 0, 0, 0] },
            { name: 'Adoções Concluídas', data: [0, 0, 0, 0] },
            { name: 'Adoções Pendentes', data: [0, 0, 0, 0] },
            { name: 'Adoções em Andamento', data: [0, 0, 0, 0] },
        ],
    });

    const countGatos = () => gatos.length;
    const countAdocoesPendentes = () => adocoes.filter(adocao => adocao.status === "pendente").length;
    const countAdocoesConcluidas = () => adocoes.filter(adocao => adocao.status === "concluido").length;
    const countGatosEmAndamento = () => adocoes.filter(adocao => adocao.status === "em andamento").length;

    return (
        <div className="grafico-resumo">
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <BarChart
                    xAxis={[{ scaleType: 'band', data: chartData.categories }]}
                    series={chartData.series}
                    width={900}
                    height={200}
                />
            )}
        </div>
    );
};
export default Graphics;
