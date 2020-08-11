const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/User');

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

  app.use(bodyParser.json());

/* middleware test */
app.post('/api/auth/login', (req, res) => {
    User.findOne({email: req.body.email}).then(user => res.status(200).json(user)).catch(error => res.status(400).json({ error }))
})

app.post('/api/auth/signup',(req, res) => {
    const user = new User({
        ...req.body
    });
    user.save()
        .then(() => res.status(201).json({message: 'Utilisateur enregistré'}))
        .catch(error => res.status(400).json({ error }));
})



module.exports = app;