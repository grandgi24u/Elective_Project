import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(cors())
const port = process.env.PORT || 4000;
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: "Api gateway" });
});

// db connection
const db = require("./models");
db.sequelize.sync();
require('./routes/auth.routes')(app);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

const {ROUTES} = require("./routes/routes");
const {setupProxies} = require("./middleware/proxy");
setupProxies(app, ROUTES);


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