// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.user;
// @ts-ignore
const bcrypt = require("bcryptjs");

exports.createUser = (req, res) => {
    User.create({
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        roleId: req.body.roleId,
        codePar: req.body.codePar,
        surname: req.body.surname
    }).then(user => {
        res.status(200).send({message: "Utilisateur créé", utilisateur: user});
    }).catch(err => {
        res.status(500).send({erreur: err.message});
    });
}

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    User.destroy({
       where: { id: userId }
    }).then(() => {
        res.status(200).send("Utilisateur supprimé");
    }).catch(err => {
        res.status(500).send({erreur: err.message});
    });
}

//TODO
exports.updateUser = (req, res) => {
    res.status(200).send("User updated");
}

exports.getUser = (req, res) => {
    const userId = req.params.id;
    User.findByPk(userId).then(user => {
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("Utilisateur non trouvé");
        }
    }).catch(err => {
        res.status(500).send({erreur: err.message});
    });
}

exports.getUsers = (req, res) => {
    User.findAll().then(users => {
        res.status(200).send(users);
    }).catch(err => {
        res.status(500).send({erreur: err.message});
    });
}

exports.updateStatus = (req, res) => {
    console.log(req.body);
    const userId = req.params.id;
    User.findByPk(userId).then(user => {
        if (user) {
            user.status = req.body.status;
            user.save().then(() => {
                res.status(200).send("Statut mis à jour");
            }).catch(err => {
                res.status(500).send({erreur: err.message});
            });
        } else {
            res.status(404).send({message : "Utilisateur non trouvé"});
        }
    });
}

// @ts-ignore
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.searchForUsers = (req, res) => {
    const name = req.query.name.toLowerCase();
    const surname = req.query.surname.toLowerCase();
    const email = req.query.email.toLowerCase();
    User.findAll({
        where: {
            name: {
                [Op.like]: '%' + name + '%'
            },
            surname: {
                [Op.like]: '%' + surname + '%'
            },
            email: {
                [Op.like]: '%' + email + '%'
            }
        }
    }).then(users => {
       if(users) {
           res.status(200).send(users);
       } else {
           res.status(404).send("Aucun utilisateur trouvé");
       }
    });
}


