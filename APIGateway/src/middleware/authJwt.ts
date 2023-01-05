// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.user;
// @ts-ignore
const Role = db.role;
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "Aucun token fourni !"
        });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Non autorisé !"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

// @ts-ignore
const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;
