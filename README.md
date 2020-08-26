Pour accéder à la base de donnée, sur le fichier app.js, dans la partie mongoose.connect, veuillez 
remplacer la partie "<username>:<password>" par l'identifiant et le mot de passe.
Deux type de droits sont définit:

1 {
    id: So-Pekocko,
    mdp : So-Pekocko,
    droits: readWriteAnyDatabase
},

2 {
    id: user,
    mdp: user,
    droits: readAnyDatabase
}