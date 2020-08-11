const express = require('express');
const User = require('../models/User');


const router = express.Router();

router.post('/signup', (req, res) => {
    const user = new User({
        ...req.body
    });
    user.save()
        .then(() => res.status(201).json({message: 'Utilisateur enregistré'}))
        .catch(error => res.status(400).json({ error }));
});




router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}).then(user => res.status(200).json(user)).catch(error => res.status(400).json({ error }))
});

module.exports = router;