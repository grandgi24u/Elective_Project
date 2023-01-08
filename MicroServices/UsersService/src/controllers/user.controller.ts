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
        roleId: req.body.roleId
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





