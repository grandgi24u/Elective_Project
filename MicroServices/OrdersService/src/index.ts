import express from 'express';
import dotenv from 'dotenv';

// db connection
const db = require("./connexion");

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: "Order microservice" });
});

const orderRoute = require("./routes/order.routes");
app.use("/order",orderRoute);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});



