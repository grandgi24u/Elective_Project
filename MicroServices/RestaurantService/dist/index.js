"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 6000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: "Restaurant microservice" });
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
