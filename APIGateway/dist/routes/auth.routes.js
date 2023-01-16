"use strict";
// @ts-ignore
const controller = require("../controllers/auth.controller");
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/signup", controller.signup);
    app.post("/signin", controller.signin);
};
