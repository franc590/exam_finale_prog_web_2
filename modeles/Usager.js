const mongoose = require("mongoose");

//Schéma pour données des usagers

let schemaUsagers = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    Nom: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        required: true,
        default: ["normal"]
    }
});

let Usagers = module.exports = mongoose.model("usagers", schemaUsagers);