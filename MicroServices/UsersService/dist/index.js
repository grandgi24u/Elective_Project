"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: "User microservice" });
});
// db connection
const db = require("./models");
/*const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "customer"
    });

    Role.create({
        id: 2,
        name: "restaurant"
    });

    Role.create({
        id: 3,
        name: "delivery"
    });
}*/
db.sequelize.sync();
require('./routes/user.routes')(app);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map