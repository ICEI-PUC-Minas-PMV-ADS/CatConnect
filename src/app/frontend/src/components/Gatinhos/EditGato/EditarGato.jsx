import React, { useState } from "react";
import "./EditarGato.css";
import { TextField, Button, Grid, FormControl, FormLabel } from "@mui/material";

function EditGato({ closeModal, gato }) {
  const [editedGato, seteditedGato] = useState({
    chip: gato.chip,
    idade: gato.idade,
    nome: gato.nome,
    cor: gato.cor,
    local: gato.local,
    castracao: gato.castracao,
    vacina: gato.vacina,
    fiv: gato.fiv,
    felv: gato.felv,
    pelagem: gato.pelagem,
    info: gato.info,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    seteditedGato({
      ...editedGato,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gato editado com sucesso!");
    closeModal();
    // Pass the editedGato object to your update function
    // updateGatoInformation(editedGato);
  };

  return (
    <div className="gatos-container">
      <form onSubmit={handleSubmit} className="gato-dados">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormLabel>Informações do Gato</FormLabel>
          </Grid>

          {/* Create similar sections for other fields in your gato object */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Nome do gato</FormLabel>
              <TextField
                fullWidth
                variant="outlined"
                name="nome"
                placeholder="Digite o nome do gato"
                value={editedGato.nome}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Chip</FormLabel>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                name="chip"
                placeholder="32705000"
                value={editedGato.chip}
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
                value={editedGato.data}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <FormLabel>Local de encontro</FormLabel>
              <TextField
                fullWidth
                label="Local de Encontro"
                variant="outlined"
                name="local"
                placeholder="Escolha o local"
                value={editedGato.local}
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
                value={editedGato.cor}
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
                value={editedGato.pelagem}
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
                value={editedGato.idade}
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
                value={editedGato.sexo}
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
                value={editedGato.castracao}
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
                value={editedGato.vacina}
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
                value={editedGato.fiv}
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
                value={editedGato.felv}
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
                value={editedGato.saude}
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
                value={editedGato.info}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Editar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default EditGato;
