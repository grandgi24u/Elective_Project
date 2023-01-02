import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const Connection = require('tedious').Connection;

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:" + port
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({ message: "Hello world" });
});

const dbConfig = require('./config/db.config');
const connection = new Connection(dbConfig);
connection.on('connect', function(err) {
    console.log("Base de données connecté");
});
connection.connect();

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});



