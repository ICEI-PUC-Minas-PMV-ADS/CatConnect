import React from "react";
import { TextField, Button, Grid, Typography, FormLabel, FormControl } from "@mui/material";
import "./AdicionarGato.css";

function AddGato({ closeModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gato adicionado com sucesso!");
    closeModal();
  };

  const gato = {

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
              disabled={gato}
              value={gato?.nome}
            />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
          <FormLabel>Chip</FormLabel>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              name="chip"
              placeholder="32705000"
              disabled={gato}
              value={gato?.chip}
            />
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth>
          <FormLabel>Data de registro</FormLabel>
            <TextField
              type="date"
              name="data"
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
              disabled={gato}
              value={gato?.local}
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
              disabled={gato}
              value={gato?.cor}
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
              disabled={gato}
              value={gato?.pelagem}
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
              disabled={gato}
              value={gato?.idade}
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
              disabled={gato}
              value={gato?.sexo}
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
              disabled={gato}
              value={gato?.castracao}
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
              disabled={gato}
              value={gato?.vacina}
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
              disabled={gato}
              value={gato?.fiv}
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
              disabled={gato}
              value={gato?.felv}
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
              disabled={gato}
              value={gato?.saude}
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
              disabled={gato}
              value={gato?.info}
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
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddGato;
