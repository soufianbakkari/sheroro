const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3001;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const chamberModel = require('./modele/chamber');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Chef')
.then(()=>{
    console.log("data base is connected");
}).catch((err)=>{
    console.log('error')
});

app.get('/', (req, res)=>{
    chamberModel.find({})
    .then(chamber=>res.json(chamber))
    .catch(e=>res.status(400).json({"message": e}));
});
app.post('/add', (req, res)=>{
    chamberModel.create({
        nom: req.body.nom,
        prix: req.body.prix,
        disponibilite: req.body.disponibilite
    })
    .then(chamber=>res.json(chamber))
    .catch(e=>res.status(400).json({"message": e}));
});
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})