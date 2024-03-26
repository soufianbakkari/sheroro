const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    type: String,
    capacite: String,
    prix: String,
    disponibilite: String,
    hotel: String
});

const UserModel = mongoose.model('chamber', ChamberSchema);
module.exports = chamberModel