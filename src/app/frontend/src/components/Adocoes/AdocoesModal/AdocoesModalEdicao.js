// AdocaoModalEdicao.css
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from "react-toastify";
import { routes } from "../../../utils/api/ApiRoutes";
import "react-datepicker/dist/react-datepicker.css";
import './AdocaoModalEdicao.css';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo"; // Importando o arquivo CSS
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

const StyledModal = styled(Modal)({
});

const StyledModalContent = styled(Box)({
});

const TitleContainer = styled(Box)({
});

const FieldContainer = styled(Box)({
});
const formatCPF = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return formattedValue;
};
const formatTelefone = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedTelefone = cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    return formattedTelefone;
};
const formatCep = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedCep = cleanedValue.replace(/(\d{5})(\d{3})/, '$1-$2');
    return formattedCep;
};
const EditModal = ({ open, onClose, rowData }) => {


    const [adotantes, setAdotantes] = useState([]);
    const [adotanteValue, setAdotanteValue] = useState(rowData?.adotante || '');
    const [gatos, setGatos] = useState([]);
    const [gatoId, setGatoId] = useState(rowData?.id_gato || '');
    const [adotanteId, setAdotanteId] = useState(rowData?.id_adotante || '');
    const [usuario, setUsuario] = useState([]);
    const [usuarioId, setUsuarioId] = useState([]);
    const [gatoValue, setGatoValue] = useState(rowData?.gato || '');
    const [responsavel, setResponsavel] = useState(rowData?.responsavel || '');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [status, setStatus] = useState([]);
    const [statusAdocao, setStatusAdocao] = useState(rowData?.status || '');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [cpfError, setCpfError] = useState(false);
    const [adotanteError, setAdotanteError] = useState(false);
    const [gatoError, setGatoError] = useState(false);
    const [responsavelError, setResponsavelError] = useState(false);
    const [statusAdocaoError, setStatusAdocaoError] = useState(false);
    const [dataValue,setDataValue ] = useState( '');



    useEffect(() => {
        getResponsavel();
        getAdotantes();
        getGatos();
        getStatus();
    }, []);

    const getResponsavel = async () => {
        try {

            const {data} = await axios.get(routes.getResponsavel, {
                withCredentials: true,
            });
            if (!data) {
                toast.error(
                    data.error ? data.error : "Houve um erro ao coletar os usuários",
                    {
                        theme: "dark",
                    }
                );
            } else {
                setUsuario(data);

            }
        } catch {
            toast.error("Usuários não encontrados", {});
        }
    };
    const handleCpfChange = (e) => {
        const inputValue = e.target.value;


        // Limite o CPF a 11 dígitos
        const limitedCpf = inputValue.slice(0, 11);
        const formattedCpf = formatCPF(limitedCpf);
        setCpf(formattedCpf);
        if (inputValue.length === 11) {
            getAdotante(formattedCpf);
        }
    };
    const handleTelefoneChange = (e) => {
        const inputValue = e.target.value;
        // Limite o telefone a 11 dígitos
        const limitedTelefone = inputValue.slice(0, 11);
        const formattedTelefone = formatTelefone(limitedTelefone);
        setTelefone(formattedTelefone);
    };
    const handleChangeCep = (e) => {
        const cepValue = e.target.value;
        setCep(formatCep(cepValue));
        // Faz a requisição apenas se o campo de CEP não estiver vazio
        if (cepValue.trim() !== '' && cepValue.trim().length === 8) {
            getCep(cepValue);
        }
    };
    const getCep = async (cep) => {
        try {
            const {data} = await axios.get(routes.getCep(cep), {
                withCredentials: true,
            });
            if (!data) {
                toast.error(
                    data.error ? data.error : "Houve um erro ao verifcar cep",
                    {
                        theme: "dark",
                    }
                );
            } else {
                setRua(data.logradouro)
                setBairro(data.bairro)
                setCidade(data.localidade)
            }
        } catch {
            toast.error("Cep não encontrado!");
        }
    }
    const getAdotantes = async () => {
        try {
            console.log(rowData)
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
                    <BorderColorIcon/>
                    <Typography variant="h6">Criar adoção</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>

                </TitleContainer>
                <FieldContainer className="field-container">
                    <TextField
                        label="Digite o CPF"
                        fullWidth
                        value={cpf}
                        onChange={handleCpfChange}
                    />

                </FieldContainer>
                <FieldContainer className="field-container">
                    <TextField
                        label="Nome do Adotante"
                        fullWidth
                        value={adotanteValue}
                        onChange={(e) => setAdotanteValue(e.target.value)}
                    >

                    </TextField>
                    <TextField
                        label="Telefone"
                        fullWidth
                        value={telefone}
                        onChange={handleTelefoneChange}
                    >

                    </TextField>

                </FieldContainer>
                <FieldContainer className="field-container">
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    >

                    </TextField>
                </FieldContainer>
                <FieldContainer className="field-container">
                    <TextField
                        label="Digite o CEP"
                        fullWidth
                        value={cep}
                        onChange={handleChangeCep}

                    >
                    </TextField>
                    <TextField
                        label="Rua(Logradouro)"
                        fullWidth
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}

                    >

                    </TextField>
                </FieldContainer>
                <FieldContainer className="field-container">
                    <TextField
                        label="Bairro"
                        fullWidth
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}

                    >

                    </TextField>
                    <TextField
                        label="Cidade"
                        fullWidth
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}

                    >

                    </TextField>
                </FieldContainer>
                <FieldContainer className="field-container">
                    <FormControl fullWidth>
                        <InputLabel id="nome-gato-label">Selecione o Gato</InputLabel>
                        <Select
                            label="Selecione o Gato"
                            labelId="nome-gato-label"
                            id="nome-gato"
                            value={gatoValue}
                            onChange={(e) => setGatoValue(e.target.value)}
                        >
                            {gatos.map((gato) => (
                                <MenuItem key={gato.id} value={gato.nome}>
                                    {gato.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="Responsável">Selecione o responsável</InputLabel>
                        <Select
                            label="Selecione o responsável"
                            fullWidth
                            value={responsavel}
                            onChange={(e) => setResponsavel(e.target.value)}
                        >
                            {usuario.map((usuarios) => (
                                <MenuItem key={usuarios._id} value={usuarios.nome}>
                                    {usuarios.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </FieldContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{marginTop: '-8px'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker value={dataValue} label="Data de adoção"/>

                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="nome-status-label">Status de Adoção</InputLabel>
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
                        </FormControl>
                    </Grid>
                </Grid>


                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    style={{marginTop: '50px', float: 'right'}}
                >
                    Salvar
                </Button>
            </StyledModalContent>
        </StyledModal>
    );
};

export default EditModal;
