//Variable mongoose pour utuliser le module mongoose
const mongoose = require('mongoose');

//URL de la bdd
const urlmongo = process.env.DB_Host;

//Connexion à la bdd
mongoose.connect(urlmongo);
const db = mongoose.connection;

//Message de connexion
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});

