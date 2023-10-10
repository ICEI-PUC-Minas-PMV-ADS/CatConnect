const Gato = require("../model/gatinhosModel"); // Assuming "gatinhosModel" represents the Gato model

module.exports.createGato = async (req, res, next) => {
  try {
    const { nome, idade, cor, castracao, vacina, fiv, felv, pelagem, info } = req.body;
    const gato = await Gato.create({ nome, idade, cor, castracao, vacina, fiv, felv, pelagem, info });
    res.status(201).json({ gato, created: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar gato", created: false });
  }
};

module.exports.getGatos = async (req, res, next) => { // Renamed to "getGatos"
  try {
    const gatos = await Gato.find();
    res.status(200).json(gatos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar gatos" });
  }
};

module.exports.editGato = async (req, res, next) => {
  const gatoId = req.params.id;
  try {
    const gato = await Gato.findByIdAndUpdate(gatoId, req.body);
    res.status(200).json({ gato, updated: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao editar gato", updated: false });
  }
};

module.exports.deleteGato = async (req, res, next) => {
  const gatoId = req.params.id;
  try {
    await Gato.findByIdAndDelete(gatoId);
    res.status(200).json({ message: "Gato excluído com sucesso", deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir gato", deleted: false });
  }
};
