const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    utilisateur_id: {type: mongoose.Schema.Types.ObjectId, ref: 'utulisateur'},
        chamber_id: {type: mongoose.Schema.Types.ObjectId, ref: 'chamber'},
});

const RestaurantModel = mongoose.model("reservation",ReservationSchema);
module.exports = reservationModel