"use strict";
// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();
// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.user;
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
    User.findByPk(req.userId).then((user) => {
        user.getRole().then((role) => {
            if (role.name !== "customer") {
                res.status(403).send({
                    message: "Accès refusé : vous n'êtes pas customer !"
                });
                return;
            }
            next();
        });
    });
};
const isRestaurant = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRole().then((role) => {
            if (role.name !== "restaurant") {
                res.status(403).send({
                    message: "Accès refusé : vous n'êtes pas un restaurateur !"
                });
                return;
            }
            next();
        });
    });
};
const isDelivery = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRole().then(role => {
            if (role.name !== "delivery") {
                res.status(403).send({
                    message: "Accès refusé : vous n'êtes pas un livreur !"
                });
                return;
            }
            next();
        });
    });
};
const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRole().then(role => {
            if (role.name !== "admin") {
                res.status(403).send({
                    message: "Accès refusé : vous n'êtes pas admin !"
                });
                return;
            }
            next();
        });
    });
};
// @ts-ignore
const authJwt = {
    verifyToken: verifyToken,
    isCustomer: isCustomer,
    isRestaurant: isRestaurant,
    isDelivery: isDelivery,
    isAdmin: isAdmin
};
module.exports = authJwt;
