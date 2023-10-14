const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({

    nome:{
        type: String,
        required: [true],
    },


});

module.exports = mongoose.model("status", statusSchema);
