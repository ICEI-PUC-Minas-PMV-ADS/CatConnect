import React, {useEffect, useState} from 'react';
import {Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem} from '@mui/material';
import {styled} from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import './AdocaoModal.css';
import axios from "axios";
import {toast} from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import {routes} from "../../../utils/api/ApiRoutes";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { format } from 'date-fns';
import DatePicker from "react-datepicker";


const StyledModal = styled(Modal)({});

const StyledModalContent = styled(Box)({});

const TitleContainer = styled(Box)({});

const FieldContainer = styled(Box)({});
const formatCPF = (value) => {
  if (!value) {
    return ''; // or handle the case when value is undefined or empty
  }

  const cleanedValue = value.replace(/\D/g, '');
  const formattedValue = cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  return formattedValue;
};

const formatTelefone = (value) => {
  if (!value) {
      return ''; // or handle accordingly if necessary
  }
  const cleanedValue = value.replace(/\D/g, '');
  const formattedTelefone = cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
  return formattedTelefone;
};

const formatCep = (value) => {
  if (!value) {
      return ''; // or handle accordingly if necessary
  }
  const cleanedValue = value.replace(/\D/g, '');
  const formattedCep = cleanedValue.replace(/(\d{5})(\d{3})/, '$1-$2');
  return formattedCep;
};
const CreateModal = ({open, onClose, dados}) => {

    const [edicao, setEdicao] = useState(false)
    // Dados do Adotante
    const [adotanteValue, setAdotanteValue] = useState('');
    const [adotanteId, setAdotanteId] = useState('');
    const [cpf, setCpf] = useState(formatCPF(''));
    const [telefone, setTelefone] = useState(formatTelefone(''));
    const [cep, setCep] = useState(formatCep(''));
    const [email, setEmail] = useState('');

    // Dados do Gato
    const [gatos, setGatos] = useState([]);
    const [gatoValue, setGatoValue] = useState('');

    // Dados do Responsável pelo Cadastro
    const [usuario, setUsuario] = useState([]);
    const [responsavel, setResponsavel] = useState('');
    const [responsavelError, setResponsavelError] = useState(false);

    // Dados de Endereço
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');

    // Dados de Adoção
    const [adocaoId, setAdocaoId] = useState('')
    const [dataValue, setDataValue] = useState(new Date());
    const [status, setStatus] = useState([]);
    const [statusAdocao, setStatusAdocao] = useState('');

    // Erros
    const [cpfError, setCpfError] = useState(false);
    const [adotanteError, setAdotanteError] = useState(false);
    const [gatoError, setGatoError] = useState(false);


    useEffect(() => {

        if(!edicao){
            setAdotanteId('')
            setGatoValue('')
            setAdotanteValue('');
            setGatoValue('');
            setResponsavel('');
            setDataValue('');
            setStatusAdocao('');
            setTelefone('');
            setEmail('');
            setCpf('');
            setCep('');
            setRua('');
            setCidade('');
            setBairro('');
        }
        getAdocoes(dados)
        getGatos();
        getStatus();
        getResponsavel();
    }, [dados]);

    const getAdocoes = (dados) => {
    if (dados) {
        setAdotanteId(dados.adotante?._id || '');  // Use optional chaining to handle undefined
        setCpf(formatCPF(dados.adotante?.cpf || ''));  // Use optional chaining to handle undefined
        setEmail(dados.adotante?.email || '');  // Use optional chaining to handle undefined
        setCep(formatCep(dados.adotante?.cep || ''));  // Use optional chaining to handle undefined
        setRua(dados.adotante?.rua || '');  // Use optional chaining to handle undefined
        setBairro(dados.adotante?.bairro || '');  // Use optional chaining to handle undefined
        setCidade(dados.adotante?.cidade || '');  // Use optional chaining to handle undefined
        setTelefone(formatTelefone(dados.adotante?.telefone || ''));  // Use optional chaining to handle undefined
        setAdotanteValue(dados.adotante?.nome || '');  // Use optional chaining to handle undefined

        if (dados.adocao) {
            setGatoValue(dados.adocao.gato || '');  // Check if 'adocao' exists before accessing 'gato'
            setResponsavel(dados.adocao.responsavel || '');  // Check if 'adocao' exists before accessing 'responsavel'
            setStatusAdocao(dados.adocao.status || '');  // Check if 'adocao' exists before accessing 'status'
            setDataValue(new Date(dados.adocao.data_adocao) || new Date());  // Check if 'adocao' exists before accessing 'data_adocao'
            setAdocaoId(dados.adocao._id || '');  // Check if 'adocao' exists before accessing '_id'
            setEdicao(true);
        } else {
            setEdicao(false);
        }
    }
};

    const handleCpfChange = (e) => {
      const inputValue = e.target.value;
    
      // Limite o CPF a 11 dígitos
      const limitedCpf = inputValue.slice(0, 11);
      const formattedCpf = formatCPF(limitedCpf);
      setCpf(formattedCpf);
    
      if (limitedCpf.length === 11) {
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
                toast.success("Cep encontrado!", {});
                setRua(data.logradouro)
                setBairro(data.bairro)
                setCidade(data.localidade)
            }
        } catch {
            setRua('')
            setBairro('')
            setCidade('')
            toast.error("Cep não encontrado!");
        }
    }
    const getAdotante = async (formattedCpf) => {
        try {
            setEdicao(false)
            const cpfWithoutSpecialChars = formattedCpf.replace(/[.-]/g, '');

            const {data} = await axios.get(routes.getAdotanteCpf(cpfWithoutSpecialChars), {
                withCredentials: true,
            });
            const cep = data.cep.replace(/[.-]/g, '');
            if (!data) {
                toast.error(
                    data.error ? data.error : "Houve um erro ao coletar os adotantes",
                    {
                        theme: "dark",
                    }
                );
            } else {
                toast.success("Adotante encontrado!", {});
                setAdotanteValue(data.nome);
                setTelefone(formatTelefone(data.telefone));
                setAdotanteId(data._id);
                setEmail(data.email);
                setCep(data.cep)
                setRua(data.rua)
                setBairro(data.bairro)
                setCidade(data.cidade)
                getCep(cep)
            }
        } catch {
            toast.error("CPF nao encontrado!", {});
        }
    };
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
    const getGatos = async () => {
        try {
            const {data} = await axios.get(routes.getGatos, {
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
            const {data} = await axios.get(routes.getStatus, {
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

        setAdotanteId('')
        setGatoValue('')
        setAdotanteValue('');
        setGatoValue('');
        setResponsavel('');
        setDataValue('');
        setStatusAdocao('');
        setTelefone('');
        setEmail('');
        setCpf('');
        setCep('');
        setRua('');
        setCidade('');
        setBairro('');
        setEdicao(false)


        onClose();
    };
    const handleChangeCep = (e) => {
        const cepValue = e.target.value;
        setCep(formatCep(cepValue));
        // Faz a requisição apenas se o campo de CEP não estiver vazio
        if (cepValue.trim() !== '' && cepValue.trim().length === 8) {
            getCep(cepValue);
        }
    };

    const handleSave = async () => {
        try {
            if (adotanteValue == '' || gatoValue == '' || responsavel  == '' || statusAdocao  == '') {
                toast.error("Por favor, preencha todos os campos antes de salvar.", {
                });
                return;
            }
            const selectedGato = gatos.find(gato => gato.nome === gatoValue);
            const formData = {
                id_adotante: adotanteId,
                id_gato: selectedGato._id,
                adotante: adotanteValue,
                gato: gatoValue,
                data_adocao: dataValue,
                status: statusAdocao,
                responsavel: responsavel,
                cep: cep,
                bairro: bairro,
                rua: rua,
                cpf: cpf,
                cidade: cidade,
                telefone: telefone,
                email: email,

            };
            if (edicao) {
                console.log(edicao)
                const {data} = await axios.put(routes.updateAdocoes(adocaoId), formData, {
                    withCredentials: true,
                });
                toast.success(
                    "Adoção editada");
            } else {
                const {data} = await axios.post(routes.createAdocoesComAdotante, formData, {
                    withCredentials: true,
                });
                toast.success(
                    "Adoção criada");
            }
            handleClose()
        } catch (error) {
            console.error("Erro ao salvar os dados", error);
            toast.error("Houve um erro ao salvar os dados", {
                theme: "dark",
            });
        }
    };

    return (

        <StyledModal open={open} onClose={onClose}  className="modal">
            <StyledModalContent className="modal-content">
                <TitleContainer className="title-container">
                    <BorderColorIcon/>
                    <Typography variant="h6">
                        Adoção

                    </Typography>
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
                        error={cpfError}
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
                <FieldContainer className="field-container">
                    <div className="input-container">
                        <DatePicker
                            label="Selecione a data"
                            selected={dataValue}
                            onChange={(date) => setDataValue(date)}
                            dateFormat="dd/MM/yyyy"
                            className="custom-datepicker" // Adicione esta classe
                        />
                    </div>
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
                </FieldContainer>

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

export default CreateModal;
