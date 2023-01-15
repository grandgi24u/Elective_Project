"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.user;
// @ts-ignore
const Role = db.role;
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();
const Op = db.Sequelize.Op;
// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const bcrypt = require("bcryptjs");
// @ts-ignore
const fetch = require("node-fetch");
// @ts-ignore
const logController = require("../controllers/log.controller");
exports.signup = (req, res, send) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch("http://localhost:3000/createUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
        redirect: 'follow'
    }).then((data) => data.json())
        .then(result => {
        res.status(200).send(result);
    })
        .catch(error => res.status(500).send(error));
});
exports.signin = (req, res, send) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        if (user.status === 1) {
            return res.status(401).send({
                message: "Accès refusé : compte désactivé !"
            });
        }
        const passwordResult = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordResult) {
            return res.status(401).send({
                accessToken: null,
                message: "Mot de passe incorrect"
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 86400
        });
        let roleValue;
        Role.findByPk(user.roleId).then((role) => {
            roleValue = "ROLE_" + role.name.toUpperCase();
            logController.createLog("login", user.id);
            res.status(200).send({
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                address: user.address,
                role: roleValue,
                codePar: user.codePar,
                accessToken: token
            });
        });
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};
exports.signinForRestaurant = (req, res, send) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        if (user.status === 1) {
            return res.status(401).send({
                message: "Accès refusé : compte désactivé !"
            });
        }
        if (user.roleId !== 2) {
            return res.status(401).send({
                message: "Accès refusé : vous n'etes pas restaurateur !"
            });
        }
        const passwordResult = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordResult) {
            return res.status(401).send({
                accessToken: null,
                message: "Mot de passe incorrect"
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 86400
        });
        let roleValue;
        Role.findByPk(user.roleId).then((role) => {
            roleValue = "ROLE_" + role.name.toUpperCase();
            logController.createLog("login", user.id);
            res.status(200).send({
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: roleValue,
                codePar: user.codePar,
                accessToken: token
            });
        });
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};
