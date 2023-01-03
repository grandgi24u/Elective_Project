// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.user;
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

const isCustomer = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Customer") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Pas le role customer !"
            });
            return;
        });
    });
};

const isRestaurant = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "restaurant") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Pas le role restaurant !"
            });
        });
    });
};

const isDelivery = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "delivery") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Pas le role delivery !"
            });
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
