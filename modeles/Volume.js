const mongoose = require('mongoose');

let schemaVolume = mongoose.Schema({
    _id: {
        type: new mongoose.Types.ObjectId() ,
        required: true
    },
    titre: {
        type: String,
        required: true
    },
    nomImage: {
        type: String,
        required: true,
        default: ""
    }
});

let Volume = module.exports = mongoose.model("volume", schemaVolume);