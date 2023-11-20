import React, { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../../utils/api/ApiRoutes";
import AddIcon from "@mui/icons-material/Add";
import LoopIcon from "@mui/icons-material/Loop";
import CheckIcon from '@mui/icons-material/Check';

const CardsResumo = () => {
    const [gatos, setGatos] = useState([]);
    const [adocoes, setAdocoes] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await axios.get(routes.getGatos, {
                withCredentials: true,
            });
            setGatos(data);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const fetchDataAdocoes = async () => {
        try {
            const { data } = await axios.get(routes.getAdocoes, {
                withCredentials: true,
            });
            setAdocoes(data);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const countGatos = () => {
        return gatos.length;
    };

    const countAdocoesPendentes = () => {
        // Filtra adoções pendentes ou em andamento
        const adocoesPendentes = adocoes.filter(adocao => adocao.status === "pendente" || adocao.status === "em andamento");
        return adocoesPendentes.length;
    };

    const countAdocoesConcluidas = () => {
        // Filtra adoções concluídas
        const adocoesConcluidas = adocoes.filter(adocao => adocao.status === "concluido");
        return adocoesConcluidas.length;
    };

    useEffect(() => {
        fetchData();
        fetchDataAdocoes();
    }, []);

    return (
        <div className="frame-resumo">
            <div className="div-3">
                <div className="div-4">
                    <div className="div-5">
                        <div className="div-6">
                            <div className="icons-wrapper">
                                <AddIcon />
                            </div>
                            <div className="div-7">
                                <div className="text-wrapper-3">Total de gatos registrados</div>
                                <div className="text-wrapper-4">{countGatos()}</div>
                            </div>
                        </div>
                        <div className="div-8">
                            <div className="property-1-linear-property-2-arrow-up-wrapper"></div>
                        </div>
                    </div>
                </div>
                <div className="div-4">
                    <div className="div-9">
                        <div className="icons-instance-wrapper">
                            <LoopIcon />
                        </div>
                        <div className="div-7">
                            <div className="div-7">
                                <div className="text-wrapper-3">Adoções Pendente / andamento </div>
                                <div className="text-wrapper-4">{countAdocoesPendentes()}</div>
                            </div>
                        </div>
                    </div>
                    <div className="div-10" />
                </div>
                <div className="div-4">
                    <div className="div-9">
                        <div className="icons-instance-wrapper-check">
                            <CheckIcon />
                        </div>
                        <div className="div-7">
                            <div className="div-7">
                                <div className="text-wrapper-3">Adoções concluídas </div>
                                <div className="text-wrapper-4">{countAdocoesConcluidas()}</div>
                            </div>
                        </div>
                    </div>
                    <div className="div-10" />
                </div>
            </div>
        </div>
    );
};

export default CardsResumo;
