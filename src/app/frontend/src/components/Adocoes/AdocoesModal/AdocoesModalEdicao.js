// AdocaoModalEdicao.css
import React from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
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
                    <Select label="Nome do Adotante" fullWidth value={adotanteValue}>
                        <MenuItem value="adotante1">Adotante 1</MenuItem>
                        <MenuItem value="adotante2">Adotante 2</MenuItem>

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
