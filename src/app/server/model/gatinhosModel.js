const mongoose = require("mongoose");

const gatinhosSchema = new mongoose.Schema({
  data: Date,
  adicional: String,
  castracao: String,
  chip: String,
  cor: String,
  felv: String,
  fiv: String,
  idade: {
    type: String,
    required: [true, 'Idade é obrigatório!'] // Custom warning message
  },
  local: String,
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório!'] // Custom warning message
  },
  pelagem: String,
  saude: String,
  sexo: String,
  vacina: String,
});

module.exports = mongoose.model("gatos", gatinhosSchema);
