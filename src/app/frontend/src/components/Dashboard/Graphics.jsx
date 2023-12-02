import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { routes } from '../../utils/api/ApiRoutes';
import { BarPlot, LinePlot, ChartContainer, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';
import BarChartIcon from '@mui/icons-material/BarChart';

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
            const gatosData = await axios.get(routes.getGatos, { withCredentials: true });
            setGatos(gatosData.data);

            const adocoesData = await axios.get(routes.getAdocoes, { withCredentials: true });
            setAdocoes(adocoesData.data);

            setLoading(false);
        } catch (error) {
            setError('Erro ao buscar dados da API');
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const prepareChartData = () => {
        return [
            {
                type: 'bar',
                yAxisKey: 'adocoes',
                data: [countAdocoesPendentes(), countAdocoesConcluidas(), countGatosEmAndamento(), 0], // Adiciona 0 para 'Gatos Cadastrados'
            },
            {
                type: 'bar',
                yAxisKey: 'gatos',
                data: [0, 0, 0, countGatos()], // 'Gatos Cadastrados' será agora uma barra
            }
        ];
    };

    const countGatos = () => gatos.length;
    const countAdocoesPendentes = () => adocoes.filter(adocao => adocao.status === "pendente").length;
    const countAdocoesConcluidas = () => adocoes.filter(adocao => adocao.status === "concluido").length;
    const countGatosEmAndamento = () => adocoes.filter(adocao => adocao.status === "em andamento").length;

    return (
        <>

            <h1 className="text-wrapper" style={{ fontSize: '50px', color: 'rgba(31,177,60,0.87)' }}> <BarChartIcon/>Resumo</h1>
        <div className="grafico-resumo">
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <ChartContainer
                    series={prepareChartData()}
                    width={950}
                    height={300}
                    xAxis={[
                        {
                            id: 'categories',
                            data: ['Adoções Pendentes', 'Adoções Concluídas', 'Adoções em Andamento', 'Gatos Cadastrados'],
                            scaleType: 'band',
                            valueFormatter: (value) => value.toString(),
                        },
                    ]}
                    yAxis={[
                        {
                            id: 'adocoes',
                            scaleType: 'linear',
                            domain: 'auto',
                        },
                        {
                            id: 'gatos',
                            scaleType: 'linear',
                            domain: 'auto',
                        },
                    ]}
                >
                    <BarPlot />
                    <LinePlot />
                    <ChartsXAxis label="Categorias" position="bottom" axisId="categories" />
                    <ChartsYAxis label="Quantidade" position="left" axisId="adocoes" />
                    <ChartsYAxis label="Quantidade de Gatos" position="right" axisId="gatos" />
                </ChartContainer>
            )}
        </div>
        </>
    );
};

export default Graphics;
