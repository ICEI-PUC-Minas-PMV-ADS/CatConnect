const User = require("../model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { handleErrors } = require('../errors/AuthenticationError');
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, celular, password, nome, adm } = req.body;

    // Limpar o número do celular
    const celularLimpo = celular.replace(/[()\-\s]+/g, '');

    const user = await User.create({ email, celular: celularLimpo, password, nome, adm });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true});
  } catch (err) {
    if (err.email === "ValidationError") {
      const errors = handleErrors(err);
      return res.status(422).json({ errors, created: false });
    } else {
      console.error(err);
      return res.status(500).json({ errors: ["Erro interno do servidor"], created: false });
    }
  }
};

module.exports.getUserByPhone = async (req, res) => {
  try {
    const { celular } = req.params;
    const user = await User.findOne({ celular });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email)
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true,  nome: user.nome  });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      const errors = handleErrors(new Error("User not found"));
      res.status(404).json({ error: errors });
    }
  } catch (error) {
    const errors = handleErrors(err);
    res.status(500).json({ errors });
  }
};

module.exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const { nome, email, celular, adm } = req.body;

  // Limpar o número do celular
  const celularLimpo = celular.replace(/[()\-\s]+/g, '');

  try {
    const user = await User.findByIdAndUpdate(
        userId,
        { nome, email, celular: celularLimpo, adm },
        { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado', updated: false });
    }

    res.status(200).json({ user, updated: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao editar usuário', updated: false });
  }
};
module.exports.passwordUser = async (req, res, next) => {
  const userId = req.params.id;
  const { newPassword } = req.body;

  try {
    // Validação da nova senha
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Senha inválida', updated: false });
    }

    // Hash da nova senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado', updated: false });
    }

    // Responder sem incluir a senha hash por razões de segurança
    res.status(200).json({ message: 'Senha atualizada com sucesso', updated: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao atualizar senha', updated: false });
  }
};


module.exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado', deleted: false });
    }

    res.status(200).json({ message: 'Usuário excluído com sucesso!', deleted: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao excluir usuário', deleted: false });
  }
};