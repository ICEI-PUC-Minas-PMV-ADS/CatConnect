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
        required: [true, "Nome do atotante é obrigatório"],
    },
    gato: {
        type: String,
        required: [true, "Nome do gato é obrigatório"],
    },
    data_adocao: {
        type: String,
        required: [true, "data é obrigatório"],
    },
    status: {
        type: String,
        required: [true, "status é obrigatório"],
    },
    responsavel: {
        type: String,
        required: [true, "responsavel é obrigatório"],
    },

});

module.exports = mongoose.model("Adocoes", adocoesSchema);
