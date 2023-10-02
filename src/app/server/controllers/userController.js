const Usuario = require("../model/userModel");

module.exports.createUser = async (req, res, next) => {
  try {
    const { nome, email, senha, isAdmin } = req.body;
    const usuario = await Usuario.create({ nome, email, senha, isAdmin });
    res.status(201).json({ usuario, created: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao criar usuário", created: false });
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

module.exports.editUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const usuario = await Usuario.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json({ usuario, updated: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao editar usuário", updated: false });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await Usuario.findByIdAndDelete(userId);
    res.status(200).json({ message: "Usuário excluído com sucesso", deleted: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao excluir usuário", deleted: false });
  }
};
