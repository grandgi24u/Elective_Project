import express from 'express';
import dotenv from 'dotenv';

// db connection
const db = require("./connexion");

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: "Order microservice" });
});


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});



