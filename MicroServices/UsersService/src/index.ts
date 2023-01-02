import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const bdd = require('./models/index');
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

// db connection
const db = require("./models");
db.sequelize.sync();

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});



