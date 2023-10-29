const mongoose = require("mongoose");

const adocoesSchema = new mongoose.Schema({

    id_adotante:{
        type: String,
        required: [true],
    },
    id_gato:{
        type: String,
        required: [true],
    },
    adotante: {
        type: String,
        required: [true, "Nome do adotante é obrigatório"],
    },
    gato: {
        type: String,
        required: [true, "Nome do gato é obrigatório"],
    },
    data_adocao: {
        type: String,
        required: [true, "Data é obrigatório"],
    },
    status: {
        type: String,
        required: [true, "Status é obrigatório"],
    },
    responsavel: {
        type: String,
        required: [true, "Responsável é obrigatório"],
    },

});

module.exports = mongoose.model("Adocoes", adocoesSchema);
