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
        const user = User.find({where: {id: decoded.id}});
        if(user.status === 1){
            return res.status(401).send({
                message: "Accès refusé : compte désactivé !"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isCustomer =  (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        if(user){
            user.getRole().then((role) => {
                if (role.name !== "customer") {
                    res.status(403).send({
                        message: "Accès refusé : vous n'êtes pas customer !"
                    });
                    return;
                }
                next();
            });
        } else {
            res.status(404).send({
                message: "User not found"
            });
        }
    });
}

const isRestaurant =  (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        if(user){
            user.getRole().then((role) => {
                if (role.name !== "restaurant") {
                    res.status(403).send({
                        message: "Accès refusé : vous n'êtes pas un restaurateur !"
                    });
                    return;
                }
                req.roleId = user.roleId;
                next();
            });
        } else {
            res.status(404).send({
                message: "User not found"
            });
        }
    });
}

const isDelivery =  (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        if(user){
            user.getRole().then(role => {
                if (role.name !== "delivery") {
                    res.status(403).send({
                        message: "Accès refusé : vous n'êtes pas un livreur !"
                    });
                    return;
                }
                next();
            });
        } else {
            res.status(404).send({
                message: "User not found"
            });
        }

    });
}

const isAdmin =  (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        if(user){
            user.getRole().then(role => {
                if (role.name !== "admin") {
                    res.status(403).send({
                        message: "Accès refusé : vous n'êtes pas admin !"
                    });
                    return;
                }
                next();
            });
        } else {
            res.status(404).send({
                message: "User not found"
            });
        }
    });
}

const isCustomerOrRestaurant =  (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        if(user){
            user.getRole().then(role => {
                if (role.name === "restaurant" || role.name === "customer") {
                    next();
                } else {
                    res.status(403).send({
                        message: "Accès refusé : vous n'êtes pas customer ou restaurant !"
                    });
                    return;
                }
            });
        } else {
            res.status(404).send({
                message: "User not found"
            });
            return;
        }
    });
}

// @ts-ignore
const authJwt = {
    verifyToken: verifyToken,
    isCustomer: isCustomer,
    isRestaurant: isRestaurant,
    isDelivery: isDelivery,
    isAdmin: isAdmin,
    isCustomerOrRestaurant : isCustomerOrRestaurant
};

module.exports = authJwt;
