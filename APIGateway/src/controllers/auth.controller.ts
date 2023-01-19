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

exports.signup = async (req, res, send) => {
    await fetch("http://172.16.44.17:3000/createUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
        redirect: 'follow'
    }).then((data) => data.json())
        .then(result => {
            if(result.message === "L'email existe déjà") {
                res.status(400).send(result)
            } else {
                res.status(200).send(result)
            }
        })
        .catch(error => res.status(500).send(error));
};

exports.signin = (req, res, send) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        if(user.status === 1){
            return res.status(401).send({
                message: "Accès refusé : compte désactivé !"
            });
        }
        if(user.roleId !== req.body.roleId && user.roleId !== 4) {
            return res.status(401).send({
                message: "Accès refusé : vous n'avez pas accès a cette application !"
            });
        }
        const passwordResult = bcrypt.compareSync(
            req.body.password,
            user.password
        );
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
