// Import the mongoose module
// @ts-ignore
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://172.16.44.14:27017/Orders";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
// @ts-ignore
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});