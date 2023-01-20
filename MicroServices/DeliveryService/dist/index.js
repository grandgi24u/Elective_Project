"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const express_1 = __importDefault(require("express"));
// @ts-ignore
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
