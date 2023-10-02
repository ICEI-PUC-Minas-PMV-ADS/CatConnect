const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
  },
  senha: {
    type: String,
    required: [true, "Senha é obrigatória"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

module.exports = mongoose.model("Usuario", userSchema);