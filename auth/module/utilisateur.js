const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nom: String,
    email: String,
    mdp: String,
    login: String
});

const UserModel = mongoose.model('auth', UserSchema);
module.exports = UserModel