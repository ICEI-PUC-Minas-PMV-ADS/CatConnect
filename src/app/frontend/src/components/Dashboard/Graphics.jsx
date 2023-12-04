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
    const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.4); // Inicia com 80% da largura da janela
    const [chartHeith, setChartHeith] = useState(window.innerHeight * 0.3); // Inicia com 80% da largura da janela


    useEffect(() => {
        fetchChartData();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleResize = () => {
        setChartWidth(window.innerWidth * 0.4); // Atualiza a largura para 80% da nova largura da janela
        setChartHeith(window.innerWidth * 0.1); // Atualiza a largura para 80% da nova largura da janela
    };
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
                    width={chartWidth}
                    height={chartHeith}
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
                    <ChartsYAxis label="Quant Adoções" position="left" axisId="adocoes" />
                    <ChartsYAxis label="Quant Gatos" position="right" axisId="gatos" />
                </ChartContainer>
            )}
        </div>
        </>
    );
};

export default Graphics;
