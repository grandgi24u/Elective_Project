// @ts-ignore
import express from 'express';
// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 7000;

// db connection
const db = require("./models/dbconnexion");

app.get('/', (req, res) => {
    res.json({ message: "Delivery microservice" });
});

const DeliveryRoute = require("./routes/delivery.routes");
app.use("/delivery", DeliveryRoute);

app.listen(port, () => {
    return console.log(`Listening at http://localhost:${port}`);
});



