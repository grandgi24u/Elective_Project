import dotenv from 'dotenv';
import express from 'express';
const app = express();

dotenv.config();
const port = process.env.PORT || 6000;


app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Restaurant microservice" });
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});