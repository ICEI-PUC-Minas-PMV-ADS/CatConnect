import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { TextField, Button } from "@mui/material";
import {routes} from "../../utils/api/ApiRoutes";
import Ellipse from "../../images/ellipse.png";
import Circle from "../../images/circle.png";
import Cat from "../../images/cat.png";
import Logo from "../../images/logo-sos-gatinhos.png";

function ResetForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [codigoVerificar, setCodigoVerificar]= useState('');
    const [usuarioId, setUsuarioId]= useState('');
    const [timer, setTimer] = useState(60);
    const [passwordValid, setPasswordValid] = useState(false);


    const formatPhoneNumber = (value) => {
        const cleanedValue = value.replace(/\D/g, '').slice(0, 11); // Limite de 11 dígitos
        return cleanedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    };

    const handlePhoneNumberChange = (event) => {
        const formattedNumber = formatPhoneNumber(event.target.value);
        setPhoneNumber(formattedNumber);
    };
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 900000) + 100000;
    };
    useEffect(() => {
            if (timer === 0 &&  step != 3 &&  step != 1 ) {
                setCodigoVerificar('');
                setStep(1);
                setVerificationCode('');
                toast.error("Código expirado! Favor reenviar sms.");
                return;
            }


        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const sendSMS = async () => {

        setTimer(60);
        if(phoneNumber == '' ){
            toast.error("Por favor! Digite o número completo.");
            return;
        }
        if(phoneNumber.length < 15 ){
            toast.error("Número deve conter 11 dígitos.");
            return;
        }
            const cleanedPhoneNumber = phoneNumber.replace(/[()\-\s]+/g, '');
            const to = '+55' +  cleanedPhoneNumber;
            const randomNumber = generateRandomNumber();
            const message = `Seu código de verificação é: ${randomNumber}`;

        try {
            const {data} = await axios.get(routes.getUsuario(cleanedPhoneNumber));

            setUsuarioId(data._id)
            setCodigoVerificar(randomNumber)
            // Enviar SMS
            await axios.post(routes.sendSms,
                { 'phoneNumber': to, message },
                { withCredentials: true }
            );

            toast.success("Sms enviado!");
            setStep(2);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Usuario não encontrado");
            } else {
                toast.error("Ocorreu um erro");
            }
        }


    };
    const verifyCode = () => {
        if(!verificationCode){
            toast.error("Digite o codigo!");
            setVerificationCode('');
            return
        }
        if(verificationCode != codigoVerificar){
            toast.error("Código incorreto!");
            setVerificationCode('');
            return
        }
        const code = verificationCode.toString().replace(/\s+/g, '');
        const newCode = codigoVerificar.toString().replace(/\s+/g, ''); // Converte para string antes de aplicar replace


        if(code === newCode){
            toast.success("Código Verificado!");
            setStep(3);
        }
    };
    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const isValid = password.length >= 6 && hasUpperCase && hasLowerCase;
        setPasswordValid(isValid);
        return isValid;
    };
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
        validatePassword(e.target.value);
    };
    const resetPassword = async () => {

        if (newPassword !== confirmPassword) {
            toast.error("As senhas não coincidem.");
            return;
        }

        // Verificar se a nova senha atende aos requisitos
        if (!validatePassword(newPassword)) {
            toast.error("A senha deve conter no mínimo 6 caracteres, incluindo letras maiúsculas e minúsculas.");
            return;
        }

        // Verificar se a senha de confirmação atende aos requisitos
        if (!validatePassword(confirmPassword)) {
            toast.error("A senha de confirmação não atende aos requisitos.");
            return;
        }
        try {
            const response = await axios.put(routes.putSenha(usuarioId), {
                newPassword
            });
            if (response.data.updated) {
                toast.success("Senha redefinida com sucesso!");
                navigate("/login");
            } else {
                toast.error(response.data.message || "Erro ao redefinir a senha.");
            }
        } catch (error) {
            toast.error("Erro ao conectar ao servidor.");
        }
    };


    const loginForm = async () => {

        navigate("/login");

    };

    return (
        <>
        <img className="ellipse" src={Ellipse} alt="ellipse" />
    <img className="circle" src={Circle} alt="circle" />
    <img className="cat" src={Cat} alt="cat" />
    <img className="logo" src={Logo} alt="logo" />
        <div className="container" style={{ width: '100%', maxWidth: 500, margin: 'auto' }}>
            <h2>Recuperar Senha</h2>
            {step === 1 && (
                <div className="phone-input-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                    <TextField
                        label="Digite seu celular"
                        variant="outlined"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        sx={{ width: '75%' }} // Reduzindo o tamanho do input
                    />
                    <Button
                        variant="contained"
                        onClick={sendSMS}
                        sx={{
                            backgroundColor: '#00ad5a', // Cor do botão verde
                            '&:hover': {
                                backgroundColor: '#007a43' // Cor mais escura para o estado de hover
                            },
                            width: '75%' // Largura do botão correspondente ao input
                        }}
                    >
                        Enviar SMS
                    </Button>
                    <span>
                    <a style={{ color: 'black', fontSize: '0.8rem' , alignContent:'right'}} onClick={loginForm}>Efetuar login</a>
                    </span>

                </div>

            )}

            {step === 2 && (
                <div >
                    <TextField
                        type="text"
                        label="Código de Verificação"
                        variant="outlined"
                        inputProps={{ maxLength: 6 }} // Limitar a 6 dígitos
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        onFocus={(e) => e.target.select()}
                        sx={{
                            flex: 1, // Ocupa a maior parte do espaço
                            marginRight: '0px' // Espaço entre o campo de texto e o botão
                        }}
                    />
                    <Button
                        onClick={verifyCode}
                        variant="contained"
                        sx={{
                            height: '56px', // Altura igual ao TextField padrão
                            flexShrink: 0, // Evita encolhimento
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            backgroundColor: '#00ad5a', // Cor do botão
                            '&:hover': {
                                backgroundColor: '#007a43' // Cor mais escura para o estado de hover
                            }
                        }}
                    >
                        Verificar Código
                    </Button>
                    <p style={{ color: 'black', fontSize: '0.8rem' , paddingTop:'10px'}}>
                        Tempo restante para o código expirar: {timer} segundos
                    </p>
                </div>
            )}
            {step === 3 && (
                <div>
                    <TextField
                        type="password"
                        label="Nova Senha"
                        variant="outlined"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                        sx={{ width: '75%' }}
                    />
                    <TextField
                        type="password"
                        label="Confirme a Nova Senha"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        sx={{
                            width: '75%' // Largura do botão correspondente ao input
                        }}
                    />
                    {!passwordValid && newPassword && (
                        <p style={{ color: 'red', fontSize: '0.8rem', width:'400px', paddingTop:'20px' , paddingBottom:'20px'}}>
                            A senha deve conter no mínimo 6 caracteres, incluindo letras maiúsculas e minúsculas.
                        </p>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={resetPassword}
                        fullWidth
                        sx={{
                            backgroundColor: '#00ad5a', // Cor do botão verde
                            '&:hover': {
                                backgroundColor: '#007a43' // Cor mais escura para o estado de hover
                            },
                            width: '75%' // Largura do botão correspondente ao input
                        }}
                    >
                        Redefinir Senha
                    </Button>
                </div>

            )}
        </div>
        </>
    );
}

export default ResetForm;
