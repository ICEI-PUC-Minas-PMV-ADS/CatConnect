import React, { useState, memo } from "react";
import "./UsuariosModal.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function UsuariosModal({ handleSubmitFunction, usuario, edit }) {
  const [usuarioEdition, setUsuarioEdition] = useState({
    _id: usuario ? usuario._id : "",
    nome: usuario ? usuario.nome : "",
    celular: usuario ? usuario.celular : "",
    email: usuario ? usuario.email : "",
    password: "", 
    adm: usuario ? usuario.adm : false, 
  });
  const formatarCelular = (numero) => {
    // Remove caracteres não numéricos
    numero = numero.replace(/\D/g, "");

    // Formata para o padrão brasileiro (XX) XXXXX-XXXX
    if (numero.length <= 11) {
      numero = numero.replace(/^(\d{2})(\d{1,5})?(\d{1,4})?$/, "($1) $2-$3");
    }

    return numero;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "celular") {
      setUsuarioEdition(prevUsuario => ({
        ...prevUsuario,
        [name]: formatarCelular(value),
      }));
    } else {
      setUsuarioEdition(prevUsuario => ({
        ...prevUsuario,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUsuarioEdition((prevUsuario) => ({
      ...prevUsuario,
      [name]: checked,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitFunction(usuarioEdition);
  };

  return (
    <div className="usuario-container">
      <form onSubmit={(e) => handleSubmit(e)} className="usuario-dados">
        <div className="usuario-coluna">
          <label>Nome</label>
          <TextField
            type="text"
            name="nome"
            placeholder="Digite o nome"
            value={usuarioEdition?.nome}
            onChange={handleInputChange}
            variant="standard"
            fullWidth
            //required
          />
        </div>
        <div className="usuario-coluna">

          <label>Celular</label>
          <TextField
              type="celular"
              name="celular"
              placeholder="Digite o celular"
              value={usuarioEdition?.celular}
              onChange={handleInputChange}
              variant="standard"
              fullWidth
              //required
          />
        </div>
        <div className="usuario-coluna">

          <label>Email</label>
          <TextField
            type="email"
            name="email"
            placeholder="Digite o email"
            value={usuarioEdition?.email}
            onChange={handleInputChange}
            variant="standard"
            fullWidth
            //required
          />
        </div>
        <div className="usuario-coluna">
          <label>Senha</label>
          <TextField
            type="password"
            name="password"
            placeholder="Digite a senha"
            value={usuarioEdition?.password}
            onChange={handleInputChange}
            variant="standard"
            fullWidth
            //required={!edit} // Senha é obrigatória ao adicionar um novo usuário, mas não ao editar
          />
        </div>
        <div className="usuario-coluna">
          <FormControlLabel
            control={
              <Checkbox
                checked={usuarioEdition?.adm}
                onChange={handleCheckboxChange}
                name="adm"
                color="primary"
              />
            }
            label="Administrador"
          />
        </div>
        <div className="usuario-botoes">
          <button type="submit">
            {!usuario ? "Adicionar" : edit ? "Salvar" : "Fechar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(UsuariosModal);
