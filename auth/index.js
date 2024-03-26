const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const UserModel = require('./modele/utilisateur');
// const axios = require('axios');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Auth')
.then(()=>{
    console.log("data base is connected");
}).catch((err)=>{
    console.log('error')
});

app.post('/register', async (req, res)=>{
    try{
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }
    
        const hashedPassword = await bcrypt.hash(req.body.mdp, 10);
    
        const newUser = new UserModel({
            email: req.body.email,
            nom: req.body.nom,
            mdp: hashedPassword
        });
    
        await newUser.save();
    
        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    }catch (error){
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    }
});

app.post('/login', async (req, res)=>{
    try{
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    
        const passwordMatch = await bcrypt.compare(req.body.mdp, user.mdp);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
    
        const token = jwt.sign({ email: user.email, userId: user._id }, process.env.TOKEN, { expiresIn: '1h' });
    
        res.status(200).json({ message: 'Connexion réussie', token: token });
    }catch (error){
        console.error('Erreur lors de la connexion de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur' });
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})