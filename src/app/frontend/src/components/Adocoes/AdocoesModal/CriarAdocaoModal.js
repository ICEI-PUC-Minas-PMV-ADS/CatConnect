import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import './AdocaoModalEdicao.css';
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const StyledModal = styled(Modal)({
});

const StyledModalContent = styled(Box)({
});

const TitleContainer = styled(Box)({
});

const FieldContainer = styled(Box)({
});

const CreateModal = ({ open, onClose, rowData }) => {
    const [adotantes, setAdotantes] = useState([]);
    const [adotanteValue, setAdotanteValue] = useState(rowData?.adotante || '');
    const [gatos, setGatos] = useState([]);
    const [gatoId, setGatoId] = useState(rowData?.id_gato || '');
    const [adotanteId, setAdotanteId] = useState(rowData?.id_adotante || '');

    const [gatoValue, setGatoValue] = useState(rowData?.gato || '');
    const [responsavel, setResponsavel] = useState(rowData?.responsavel || '');
    const [startDate, setStartDate] = useState(new Date());
    const [status, setStatus] = useState([]);
    const [statusAdocao, setStatusAdocao] = useState(rowData?.statusAdocao || '');


    useEffect(() => {
        getAdotantes();
        getGatos();
        getStatus();
    }, []);

    const getAdotantes = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/adotantes", {
                withCredentials: true,
            });
            if (!data) {
                toast.error(
                    data.error ? data.error : "Houve um erro ao coletar os adotantes",
                    {
                        theme: "dark",
                    }
                );
            } else {
                setAdotantes(data);
            }
        } catch {
            toast.error("Houve um erro ao procurar dados", {
                theme: "dark",
            });
        }
    };
    const getGatos = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/gatos", {
                withCredentials: true,
            });
            if (!data) {
                toast.error(
                    data.error ? data.error : "Houve um erro ao coletar os dados do gato",
                    {
                        theme: "dark",
                    }
                );
            } else {
                setGatos(data);
            }
        } catch {
            toast.error("Houve um erro ao procurar dados", {
                theme: "dark",
            });
        }
    };
    const getStatus = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/status", {
                withCredentials: true,
            });
            const statusData = data.data;

            if (!data) {
                toast.error(
                    data.error ? data.error : "Houve um erro ao coletar os status",
                    {
                        theme: "dark",
                    }
                );
            } else {
                setStatus(statusData);
            }
        } catch {
            toast.error("Houve um erro ao procurar dados", {
                theme: "dark",
            });
        }
    };
    const handleClose = () => {
        // Limpe os estados ao fechar o modal
        setAdotanteValue('');
        setGatoValue('');
        setResponsavel('');
        setStartDate(new Date());
        setStatusAdocao('');

        // Chame a função onClose
        onClose();
    };

    const handleSave = async () => {
        try {
            if (!adotanteValue || !gatoValue || !responsavel || !statusAdocao) {
                toast.error("Por favor, preencha todos os campos antes de salvar.", {
                    theme: "dark",
                });
                return;
            }
            const selectedAdotante = adotantes.find(adotante => adotante.nome === adotanteValue);
            const selectedGato = gatos.find(gato => gato.nome === gatoValue);

            const formData = {
                id_adotante: selectedAdotante._id,
                id_gato: selectedGato._id,
                adotante: adotanteValue,
                gato: gatoValue,
                data_adocao: startDate,
                status: statusAdocao,
                responsavel: responsavel,

            };

            const { data } = await axios.post("http://localhost:4000/adocoes", formData, {
                withCredentials: true,
            });
            toast.success(
                "Adoção concluida",
                {
                    theme: "dark",
                }
            );
            setAdotanteValue('');
            setGatoValue('');
            setResponsavel('');
            setStartDate(new Date());
            setStatusAdocao('');

            // Chame a função onClose
            onClose();
        } catch (error) {
            console.error("Erro ao salvar os dados", error);
            toast.error("Houve um erro ao salvar os dados", {
                theme: "dark",
            });
        }
    };

    return (
        <StyledModal open={open} onClose={onClose} className="modal">
            <StyledModalContent className="modal-content">
                <TitleContainer className="title-container">
                    <Typography variant="h6">Criar adoção</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </TitleContainer>
                <FieldContainer className="field-container">
                    <Select
                        label="Nome do Adotante"
                        fullWidth
                        value={adotanteValue}
                        onChange={(e) => setAdotanteValue(e.target.value)}
                    >
                        {adotantes.map((adotante) => (
                            <MenuItem key={adotante.id} value={adotante.nome}>
                                {adotante.nome}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select  label="Nome do gato"
                            fullWidth
                            value={gatoValue}
                            onChange={(e) => setGatoValue(e.target.value)}>
                        {gatos.map((gato) => (
                            <MenuItem key={gato.id} value={gato.nome}>
                                {gato.nome}
                            </MenuItem>
                        ))}

                    </Select>
                </FieldContainer>
                <FieldContainer className="field-container">
                    <TextField
                        label="Responsável"
                        fullWidth
                        value={responsavel}
                        onChange={(e) => setResponsavel(e.target.value)}
                    />
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="custom-datepicker"
                    />
                </FieldContainer>
                <FieldContainer className="field-container">
                    <Select
                        label="Status de Adoção"
                        fullWidth
                        value={statusAdocao}
                        onChange={(e) => setStatusAdocao(e.target.value)}
                    >
                        {status.map((statusAdocao) => (
                            <MenuItem key={statusAdocao._id} value={statusAdocao.nome}>
                                {statusAdocao.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FieldContainer>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    style={{ marginTop: '16px', float: 'right' }}
                >
                    Salvar
                </Button>
            </StyledModalContent>
        </StyledModal>
    );
};

export default CreateModal;
