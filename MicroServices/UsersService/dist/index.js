"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bdd = require('./models/index');
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: "http://localhost:" + port
};
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    res.json({ message: "Hello world" });
});
// db connection
const db = require("./models");
db.sequelize.sync();
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map