"use strict";
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("logs", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        action: {
            type: Sequelize.STRING
        }
    });
};
