const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3003;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const userModel = require('./modele/utilisateur');
const chamberModel = require('./modele/chamber');
const reservationModel = require('./modele/reservation');


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Restaurant')
.then(()=>{
    console.log("data base is connected");
}).catch((err)=>{
    console.log('error')
});
app.get('/utilisateur/:id', (req, res)=>{
    const reservation = userModel.findOne({_id:req.params.id});

    chamberModel.find({_id: reservation.utuilisateur_id})
    .then(chamber=>res.json(chamber))
    .catch(err => console.log(err));
});
 
app.post('/add', (req, res)=>{
    reservationModel.create({
        utulisateur_id: req.body.user,
        chamber_id: req.body.chamber,
    })
    .then(reservation=>res.json(reservation))
    .catch(err => console.log(err));
});
