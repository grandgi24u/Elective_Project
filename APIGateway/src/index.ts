import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: "http://localhost:" + port
}
app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: "User microservice" });
});
// db connection
const db = require("./models");
db.sequelize.sync();
require('./routes/auth.routes')(app);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});








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