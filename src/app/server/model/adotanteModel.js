const mongoose = require("mongoose");

const adotanteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
  },
  cpf: {
    type: String,
    required: [true, "Cpf é obrigatório"],
  },
  rg: {
    type: String,
    required: [true, "RG é obrigatório"],
  },
  instagram: {
    type: String,
  },
  telefone: {
    type: String,
  },
  cidade: {
    type: String,
  },
  bairro: {
    type: String,
  },
  rua: {
    type: String,
  },
  cep: {
    type: String,
  },
  ruaNumero: {
    type: String,
  },
  complemento: {
    type: String,
  }
});

module.exports = mongoose.model("Adotante", adotanteSchema);
