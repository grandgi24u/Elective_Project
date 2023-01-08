"use strict";
// @ts-ignore
const jwt = require("jsonwebtoken");
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
                message: "Accès refusé : token invalide !"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
const isCustomer = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
            if (role.name === "customer") {
                next();
                return;
            }
            res.status(403).send({
                message: "Accès refusé : vous n'êtes pas customer !"
            });
            return;
        });
    });
};
const isRestaurant = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
            if (role.name === "restaurant") {
                next();
                return;
            }
            res.status(403).send({
                message: "Accès refusé : vous n'êtes pas un restaurateur !"
            });
            return;
        });
    });
};
const isDelivery = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
            if (role.name === "delivery") {
                next();
                return;
            }
            res.status(403).send({
                message: "Accès refusé : vous n'êtes pas un livreur !"
            });
            return;
        });
    });
};
// @ts-ignore
const authJwt = {
    verifyToken: verifyToken,
    isCustomer: isCustomer,
    isRestaurant: isRestaurant,
    isDelivery: isDelivery
};
module.exports = authJwt;
