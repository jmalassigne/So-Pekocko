const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://So-Pekocko:So-Pekocko@cluster0.7dlkg.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api',(req, res) => {
    const stuff = {
        id: 3837373,
        prenom: 'juju'
    };
    res.json(stuff);
})



module.exports = app;