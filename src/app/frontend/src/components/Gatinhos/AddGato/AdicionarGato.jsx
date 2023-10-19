import React from "react";
import { useState } from "react";
import { TextField, Button, Grid, Typography, FormLabel, FormControl } from "@mui/material";
import "./AdicionarGato.css";

function AddGato({ closeModal }) {
  const [gato, setGato] = useState({
    nome: "",
    chip: "",
    data: "",
    local: "",
    cor: "",
    pelagem: "",
    idade: "",
    sexo: "",
    castracao: "",
    vacina: "",
    fiv: "",
    felv: "",
    saude: "",
    info: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gato adicionado com sucesso!", gato);
    closeModal();
  };

  // Define a handler function to update the gato state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGato({
      ...gato,
      [name]: value,
    });
  };

  return (
    <div className="gatos-container">
      <form onSubmit={handleSubmit} className="gato-dados">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography id="secao">Informações do Gato</Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Nome do gato</FormLabel>
              <TextField
                fullWidth
                variant="outlined"
                name="nome"
                placeholder="Digite o nome do gato"
                value={gato?.nome}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Chip</FormLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="chip"
                  placeholder="32705000"
                  value={gato?.chip}
                  onChange={handleInputChange}
                />
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth>
          <FormLabel>Data de registro</FormLabel>
            <TextField
              type="date"
              name="data"
              value={gato?.data}
              onChange={handleInputChange}
            />
            </FormControl>
          </Grid>

          <Grid item xs={5}>
          <FormControl fullWidth>
          <FormLabel>Local de encontro</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="local"
              placeholder="Escolha o local"
              value={gato?.local}
              onChange={handleInputChange}
            />
             </FormControl>
          </Grid>


          <Grid item xs={3}>
          <FormControl fullWidth>
          <FormLabel>Cor</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="cor"
              placeholder="Digite a cor"
              value={gato?.cor}
              onChange={handleInputChange}
            />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
          <FormControl fullWidth>
          <FormLabel>Pelagem</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="pelagem"
              placeholder="Escolha a pelagem"
              value={gato?.pelagem}
              onChange={handleInputChange}
            />
            </FormControl>
          </Grid>


          <Grid item xs={3}>
          <FormControl fullWidth>
          <FormLabel>Idade Estimada</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="idade"
              placeholder="Digite a idade"
              value={gato?.idade}
              onChange={handleInputChange}
            />
          </FormControl>
          </Grid>

          <Grid item xs={3}>
          <FormControl fullWidth>
          <FormLabel>Sexo</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="sexo"
              placeholder="Escolha o sexo"
              value={gato?.sexo}
              onChange={handleInputChange}
            />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
          <FormControl fullWidth>
          <FormLabel>Castração</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="castracao"
              placeholder="Castrado?"
              value={gato?.castracao}
              onChange={handleInputChange}
            />
            </FormControl>
          </Grid>


          <Grid item xs={3}>
          <FormControl fullWidth>
          <FormLabel>Vacina</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="vacina"
              placeholder="Escolha a vacina"
              value={gato?.vacina}
              onChange={handleInputChange}
            />
          </FormControl>
          </Grid>

          <Grid item xs={3}>
          <FormControl fullWidth>
          <FormLabel>FIV</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="fiv"
              placeholder="Status FIV"
              value={gato?.fiv}
              onChange={handleInputChange}
            />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
          <FormControl fullWidth>
          <FormLabel>FeLV</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="felv"
              placeholder="Status FeLV"
              value={gato?.felv}
              onChange={handleInputChange}
            />
            </FormControl>
          </Grid>


          <Grid item xs={3}>
          <FormControl fullWidth>
          <FormLabel>Saúde</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="saude"
              placeholder="Problemas de saúde"
              value={gato?.saude}
              onChange={handleInputChange}
            />
          </FormControl>
          </Grid>

          <Grid item xs={12}>

            <FormControl fullWidth>
            <FormLabel>Informações adicionais</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="info"
              placeholder="Informações adicionais"
              value={gato?.info}
              onChange={handleInputChange}
            />
            </FormControl>
          </Grid>
          
          <Grid item xs={5}>
            <Button
              id="salvar"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddGato;
