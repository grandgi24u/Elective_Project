// @ts-ignore
import express from 'express';
// @ts-ignore
import dotenv from 'dotenv';

// db connection
const db = require("./connexion");

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: "Delivery microservice" });
});

const DeliveryRoute = require("./routes/delivery.routes");
app.use("/delivery", DeliveryRoute);

app.listen(port, () => {
    return console.log(`Listening at http://localhost:${port}`);
});



