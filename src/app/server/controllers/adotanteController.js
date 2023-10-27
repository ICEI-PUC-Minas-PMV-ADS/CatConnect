const Adotante = require("../model/adotanteModel");
const crypto = require("crypto");
const Adocao = require("../model/adocaoModel");

module.exports.createAdotante = async (req, res, next) => {
  try {
    const { nome, email, cpf, rg, telefone, instagram, rua, bairro, cidade, cep } = req.body;
    const adotante = await Adotante.create({ nome, email, cpf, rg, telefone, instagram, rua, bairro, cidade, cep });
    res.status(201).json({ adotante, created: true, adotante: adotante });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao criar adotante", created: false });
  }
};

module.exports.obterAdotantesPorCpf  = async (req, res) => {
  const { cpf } = req.params;

  try {
    // Ajuste a lógica de consulta para usar o campo de CPF
    const adotante = await Adotante.findOne({ cpf: cpf });

    if (!adotante) {
      return res.status(404).json({ error: 'Adoção não encontrada' });
    }

    res.status(200).json(adotante);
  } catch (error) {
    console.error('Erro ao obter adoção por CPF:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
},
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
    const adotante = await Adotante.findByIdAndUpdate(adotanteId, req.body);
    res.status(200).json({ adotante, updated: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao editar adotante", updated: false });
  }
};

module.exports.deleteAdotante = async (req, res, next) => {
  const adotanteId = req.params._id;
  try {
    await Adotante.findByIdAndDelete(adotanteId);
    res.status(200).json({ message: "Adotante excluído com sucesso", deleted: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao excluir adotante", deleted: false });
  }
};
