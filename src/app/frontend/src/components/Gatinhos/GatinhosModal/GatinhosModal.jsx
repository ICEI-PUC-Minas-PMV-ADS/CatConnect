import React, { useState, memo } from "react";
import "./GatinhosModal.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function GatinhosModal({ handleSubmitFunction, gatinho, edit }) {
  const [gatinhoEdition, setGatinhoEdition] = useState({
    _id: gatinho ? gatinho._id : "",
    nome: gatinho && gatinho.nome ? gatinho.nome : "",
    chip: gatinho && gatinho.chip ? gatinho.chip : "",
    data: gatinho && gatinho.data ? gatinho.data.split("T")[0] : "",
    local: gatinho && gatinho.local ? gatinho.local : "",
    cor: gatinho && gatinho.cor ? gatinho.cor : "",
    pelagem: gatinho && gatinho.pelagem ? gatinho.pelagem : "",
    idade: gatinho && gatinho.idade ? gatinho.idade : "",
    sexo: gatinho && gatinho.sexo ? gatinho.sexo : "",
    castracao: gatinho && gatinho.castracao ? gatinho.castracao : "",
    vacina: gatinho && gatinho.vacina ? gatinho.vacina : "",
    fiv: gatinho && gatinho.fiv ? gatinho.fiv : "",
    felv: gatinho && gatinho.felv ? gatinho.felv : "",
    saude: gatinho && gatinho.saude ? gatinho.saude : "",
    adicional: gatinho && gatinho.adicional ? gatinho.adicional : "",
  });

  const [error, setError] = useState(false);

  const idadeError = gatinhoEdition.idade?.length <= 0;
  const nomeError = gatinhoEdition.nome?.length <= 0;
  const corError = gatinhoEdition.cor?.length <= 0;
  const castracaoError =
    gatinhoEdition.castracao !== "sim" && gatinhoEdition.castracao !== "nao";
  const vacinaError =
    gatinhoEdition.vacina !== "sim" && gatinhoEdition.vacina !== "nao";
  const fivError =
    gatinhoEdition.fiv !== "positivo" && gatinhoEdition.fiv !== "negativo";
  const felvError =
    gatinhoEdition.felv !== "positivo" && gatinhoEdition.felv !== "negativo";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGatinhoEdition((prevGatinho) => ({
      ...prevGatinho,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      idadeError ||
      nomeError ||
      corError ||
      castracaoError ||
      vacinaError ||
      fivError ||
      felvError
    ) {
      setError(true);
    } else {
      setError(false);
      handleSubmitFunction(gatinhoEdition);
    }
  };

  return (
    <div className="gatinho-container">
      <form onSubmit={(e) => handleSubmit(e)} className="gatinho-dados">
        <div className="gatinho-linha">
          <div className="gatinho-coluna">
            <label>Nome do gato</label>
            <TextField
              type="nome"
              name="nome"
              placeholder="Digite o nome do gato"
              value={gatinhoEdition?.nome}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
              helperText={error && nomeError ? "Nome inválido" : ""}
              error={error && nomeError}
            />
          </div>
          <div className="gatinho-coluna">
            <label>Chip</label>
            <TextField
              type="chip"
              name="chip"
              placeholder="Digite o chip do gato"
              value={gatinhoEdition?.chip}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
        </div>
        <div className="gatinho-linha">
          <div className="gatinho-coluna">
            <label>Data de registro</label>
            <TextField
              type="date"
              name="data"
              value={gatinhoEdition?.data}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
              defaultValue={gatinhoEdition?.data}
            />
          </div>
          <div className="gatinho-coluna">
            <label>Local de encontro</label>
            <TextField
              type="local"
              placeholder="Digite o local de encontro"
              name="local"
              value={gatinhoEdition?.local}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
        </div>
        <div className="gatinho-linha">
          <div className="gatinho-coluna">
            <label>Cor</label>
            <TextField
              type="cor"
              placeholder="Digite a cor do gato"
              name="cor"
              value={gatinhoEdition?.cor}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
              helperText={error && corError ? "Cor inválida" : ""}
              error={error && corError}
            />
          </div>
          <div className="gatinho-coluna">
            <label>Pelagem</label>
            <TextField
              type="pelagem"
              placeholder="Digite a pelagem do gato"
              name="pelagem"
              value={gatinhoEdition?.pelagem}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
          <div className="gatinho-coluna">
            <label>Idade estimada</label>
            <TextField
              type="idade"
              placeholder="Digite a idade estimada do gato"
              name="idade"
              value={gatinhoEdition?.idade}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
        </div>
        <div className="gatinho-linha">
          <div className="gatinho-coluna">
            <label>Sexo</label>
            <TextField
              type="sexo"
              placeholder="Digite o sexo"
              name="sexo"
              value={gatinhoEdition?.sexo}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
          <div className="gatinho-coluna">
            <label>Castração</label>
            <Select
              type="castracao"
              name="castracao"
              value={gatinhoEdition?.castracao}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
              disabled={!edit}
              error={error && castracaoError}
            >
              <MenuItem value={"sim"}>Sim</MenuItem>
              <MenuItem value={"nao"}>Não</MenuItem>
            </Select>
          </div>
          <div className="gatinho-coluna">
            <label>Vacina</label>
            <Select
              type="vacina"
              name="vacina"
              value={gatinhoEdition?.vacina}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
              disabled={!edit}
              error={error && vacinaError}
            >
              <MenuItem value={"sim"}>Sim</MenuItem>
              <MenuItem value={"nao"}>Não</MenuItem>
            </Select>
          </div>
        </div>
        <div className="gatinho-linha">
          <div className="gatinho-coluna">
            <label>FIV</label>
            <Select
              type="fiv"
              name="fiv"
              value={gatinhoEdition?.fiv}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
              disabled={!edit}
              error={error && fivError}
            >
              <MenuItem value={"positivo"}>Positivo</MenuItem>
              <MenuItem value={"negativo"}>Negativo</MenuItem>
            </Select>
          </div>
          <div className="gatinho-coluna">
            <label>FeLV</label>
            <Select
              type="felv"
              name="felv"
              value={gatinhoEdition?.felv}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
              disabled={!edit}
              error={error && felvError}
            >
              <MenuItem value={"positivo"}>Positivo</MenuItem>
              <MenuItem value={"negativo"}>Negativo</MenuItem>
            </Select>
          </div>
          <div className="gatinho-coluna">
            <label>Saúde</label>
            <TextField
              type="saude"
              placeholder="Problemas de saúde"
              name="saude"
              value={gatinhoEdition?.saude}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
        </div>
        <div className="gatinho-linha">
          <div className="gatinho-coluna">
            <label>Informações adicionais</label>
            <TextField
              type="adicional"
              placeholder="Informações adicionais"
              name="adicional"
              value={gatinhoEdition?.adicional}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
        </div>
        <button type="submit">
          {!gatinho ? "Adicionar" : edit ? "Salvar" : "Fechar"}
        </button>
      </form>
    </div>
  );
}

export default memo(GatinhosModal);
