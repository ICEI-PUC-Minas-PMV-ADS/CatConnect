const User = require("../model/authModel");
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
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {

    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(500).json({ errors });
  }
};

module.exports.getUserById = async (req, res) => {
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

module.exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.status(200).json(user);
    } else {
      const errors = handleErrors(new Error("User not found"));
      res.status(404).json({ errors });
    }
  } catch (error) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({ message: "Usuário excluído com sucesso!" });
    } else {
      const errors = handleErrors(new Error("User not found"));
      res.status(404).json({ errors });
    }
  } catch (error) {
    const errors = handleErrors(err);
    res.status(500).json({ errors });
  }
};
