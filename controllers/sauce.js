const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
        
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }))
};

exports.updateSauce = (req, res) => {

    if(req.file){
        Sauce.findOne({_id: req.params.id})
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const sauceObjet = {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    };
                    Sauce.updateOne({_id: req.params.id}, {...sauceObjet, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet modifié'}))
                    .catch(error => res.status(400).json({ error }))
                });
        })
            .catch(error => res.status(500).json({ error }));
    } else {
        Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
            .then(() => res.status(200).json({message: 'Objet modifié'}))
            .catch(error => res.status(400).json({ error }));
    }
};




exports.deleteSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet supprimé'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const userAlreadyLikes = sauce.usersLiked.includes(req.body.userId);
            const userAlreadyDislikes = sauce.usersDisliked.includes(req.body.userId);
            const likeValue = req.body.like;

            if(likeValue === -1){
                if(!userAlreadyDislikes && !userAlreadyLikes){
                    Sauce.updateOne({_id: req.params.id}, {$inc : {dislikes: 1}, $addToSet: {usersDisliked: req.body.userId}})
                        .then(() => res.status(200).json({message: 'Dislike mis à jour'}))
                        .catch(error => res.status(200).json({ error }));
                } else {
                    res.status(400).json({message: "Dislike impossible"});
                }
            } else {

                if(likeValue === 1){
                    
                    if(!userAlreadyLikes && !userAlreadyDislikes){
                        Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $addToSet: {usersLiked: req.body.userId}})
                            .then(() => res.status(200).json({message: "Like mis à jour"}))
                            .catch(error => res.status(400).json({ error }));
                    } else {
                        res.status(400).json({message: "Like impossible"});
                    }
                } else {
                    if(userAlreadyDislikes){
                        Sauce.updateOne({_id: req.params.id}, {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1}})
                            .then(() => res.status(200).json({message: "Annulation du dislike"}))
                            .catch(error => res.status(400).json({ error }));
                    }
                    if(userAlreadyLikes){
                        Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}})
                            .then(() => res.status(200).json({ message: "Annulation du like"}))
                            .catch(error => res.status(400).json({ error }))
                    }
                }

            }

        })
        .catch(error => res.status(500).json({ error }))
};