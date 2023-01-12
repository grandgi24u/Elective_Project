// @ts-ignore
const Sequelize = require("sequelize");
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    options: {
        encrypt: false
    }
});

// @ts-ignore
const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: require("../models/user.model.js")(sequelize, Sequelize),
    role: require("../models/role.model.js")(sequelize, Sequelize),
    log: require("../models/log.model.js")(sequelize, Sequelize)
};

db.user.belongsTo(db.role, {
    foreignKey: 'roleId',
    targetKey: 'id'
});

db.log.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
});

module.exports = db;