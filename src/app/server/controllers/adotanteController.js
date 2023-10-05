const Adotante = require("../model/adotanteModel");
const crypto = require("crypto");

module.exports.createAdotante = async (req, res, next) => {
  try {
    const { nome, email, cpf, rg, telefone, instagram, rua, bairro, cidade, cep } = req.body;
    const id = crypto.randomBytes(16).toString("hex");
    const adotante = await Adotante.create({ id, nome, email, cpf, rg, telefone, instagram, rua, bairro, cidade, cep });
    res.status(201).json({ adotante, created: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao criar adotante", created: false });
  }
};

module.exports.getAdotante = async (req, res, next) => {
  try {
    const adotantes = await Adotante.find();
    res.status(200).json(adotantes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao buscar adotantes" });
  }
};

module.exports.editAdotante = async (req, res, next) => {
  const adotanteId = req.params.id;
  try {
    const adotante = await Adotante.findByIdAndUpdate(adotanteId, req.body, { new: true });
    res.status(200).json({ adotante, updated: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao editar adotante", updated: false });
  }
};

module.exports.deleteAdotante = async (req, res, next) => {
  const adotanteId = req.params.id;
  try {
    await Adotante.findByIdAndDelete(adotanteId);
    res.status(200).json({ message: "Adotante excluído com sucesso", deleted: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao excluir adotante", deleted: false });
  }
};
