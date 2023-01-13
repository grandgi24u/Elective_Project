// @ts-ignore
const db = require("../models");
// @ts-ignore
const Log = db.log;
// @ts-ignore
const User = db.user;

exports.createLog = (message, userId) => {
    Log.create({
        userId: userId,
        action: message,
    }).then((log) => {
        return true;
    }).catch((err) => {
        return false;
    })
}

exports.getLogs = (req, res) => {
    Log.findAll({
        include: [{
            model: User,
            attributes: ['surname', 'name', 'email']
        }]
    }).then((logs) => {
        res.status(200).send(logs);
    }).catch((err) => {
        res.status(500).send({message: err.message});
    })
}

exports.getLogsByUser = (req, res) => {
    Log.findAll({
        where: {
            userId: req.params.id
        },
        attributes: ['action', 'createdAt']
    }).then((logs) => {
        res.status(200).send(logs);
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
}
