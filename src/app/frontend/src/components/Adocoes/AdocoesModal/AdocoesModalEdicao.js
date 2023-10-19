// AdocaoModalEdicao.css
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from "react-toastify";
import { routes } from "../../../utils/api/ApiRoutes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AdocaoModalEdicao.css'; // Importando o arquivo CSS

const StyledModal = styled(Modal)({
});

const StyledModalContent = styled(Box)({
});

const TitleContainer = styled(Box)({
});

const FieldContainer = styled(Box)({
});

const EditModal = ({ open, onClose, rowData }) => {
    // Certifique-se de que rowData está definido antes de acessar suas propriedades
    const adotanteValue = rowData?.adotante || '';
    const gatoValue = rowData?.gato || '';
    const nomeValue = rowData?.nome || '';
    const dataAdocaoValue = rowData?.dataAdocao || '';
    const [statusAdocao, setStatusAdocao] = useState(rowData?.statusAdocao || '');
    const [responsavel, setResponsavel] = useState(rowData?.responsavel || '');
    const [startDate, setStartDate] = useState(new Date());
    const [adotantes, setAdotantes] = useState([]);
    const [gatos, setGatos] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        getAdotantes();
        getGatos();
        getStatus();
    }, []);

    const getAdotantes = async () => {
        try {
            const { data } = await axios.get(routes.getAdotantes, {
                withCredentials: true,
            });
            console.log(data)
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
            const { data } = await axios.get(routes.getGatos, {
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
            const { data } = await axios.get(routes.getStatus, {
                withCredentials: true,
            });
            const statusData = data.data;
            console.log(statusData)
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

    const handleSave = async (rowData) => {
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

            const { data } = await axios.put(routes.updateAdocoes (rowData._id), formData, {
                withCredentials: true,
            });
            toast.success(
                "Adoção editada",
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
                    <Typography variant="h6">Edição de Adoção</Typography>
                    <IconButton onClick={onClose}>
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
                    <Select label="Nome do gato"
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

export default EditModal;
