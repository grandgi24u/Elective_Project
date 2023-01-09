"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// db connection
const db = require("./connexion");
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 4000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: "Order microservice" });
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
