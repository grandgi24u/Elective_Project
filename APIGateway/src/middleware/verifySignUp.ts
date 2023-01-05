// @ts-ignore
const db = require("../models");
// @ts-ignore
const Role = db.role;
// @ts-ignore
const User = db.user;

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

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            Role.findOne({
                where: {
                    name: req.body.roles[i]
                }
            }).then(role => {
               if(!role) {
                   res.status(400).send({
                       message: "Le role " + req.body.roles[i] + "n'existe pas"
                   });
                   return;
               }
            });
        }
    }
    next();
};

// @ts-ignore
const verifySignUp = {
    checkIfEmailExist: checkIfEmailExist,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;