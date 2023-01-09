import express from 'express';
const app = express();
const port = 5000;


app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Order microservice" });
});


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});



