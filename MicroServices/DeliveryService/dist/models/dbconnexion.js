"use strict";
// @ts-ignore
const mongoose = require('mongoose');
//URL de la bdd
mongoose.set('strictQuery', true);
//Connexion à la bdd
mongoose.connect(process.env.DB_Host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// @ts-ignore
const db = mongoose.connection;
//Message de connexion
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
    console.log("Connexion à la base OK");
});
