// AdocaoModalEdicao.css
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { routes } from "../../../utils/api/ApiRoutes";
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
    const estatusAdocaoValue = rowData?.estatusAdocao || '';

    const [adotantes, setAdotantes] = useState([]);
    const [gatos, setGatos] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        getAdotantes();
        //getGatos();
        //getStatus();
    }, []);

    const getAdotantes = async () => {
        try {
            const { data } = await axios.get(routes.getAdotantes, {
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

    const handleSave = () => {
        // Lógica para salvar os dados editados
        // ...
        onClose(); // Fechar o modal após salvar
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
                    <Select label="Nome do Gato" fullWidth value={gatoValue}>
                        <MenuItem value="gato1">Gato 1</MenuItem>
                        <MenuItem value="gato2">Gato 2</MenuItem>

                    </Select>
                </FieldContainer>
                <FieldContainer className="field-container">
                    <TextField label="Nome" fullWidth value={nomeValue} />
                    <TextField label="Data de Adoção" fullWidth value={dataAdocaoValue} />
                </FieldContainer>
                <FieldContainer className="field-container">
                    <Select label="Estatus de Adoção" fullWidth value={estatusAdocaoValue}>
                        <MenuItem value="concluída">Concluída</MenuItem>
                        <MenuItem value="em andamento">Em Andamento</MenuItem>
                        <MenuItem value="pendente">Pendente</MenuItem>
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
