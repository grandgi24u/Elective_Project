// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.user;
// @ts-ignore
const Role = db.role;

const checkIfEmailExist = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "L'email existe déjà"
            });
            return
        }
        next();
    });
};

const checkRoleId = (req, res, next) => {
    Role.findByPk(req.body.roleId).then(role => {
        if (!role) {
            res.status(400).send({
                message: "Le role n'existe pas"
            });
            return
        }
        next();
    });
}

const checkIfUserExist = (req, res, next) => {
    User.findByPk(req.params.id).then(user => {
        if (!user) {
            res.status(400).send({
                message: "L'utilisateur n'existe pas"
            });
            return
        }
        next();
    });
}

// @ts-ignore
const checkData = {
    checkIfEmailExist : checkIfEmailExist,
    checkRoleId : checkRoleId,
    checkIfUserExist : checkIfUserExist
};

module.exports = checkData;
