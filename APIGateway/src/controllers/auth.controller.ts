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

exports.signup = (req, res) => {
    User.create({
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        roleId: req.body.roleId
    }).then(user => {
        if(user)  {
            res.send({message: "L'utilisateur à été enregistré"});
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
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
        Role.findAll({
            where: {
                id: user.roleId
            }
        }).then(roles => {
            roleValue = "ROLE_" + roles[0].name.toUpperCase();
            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                role: roleValue,
                accessToken: token
            });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
