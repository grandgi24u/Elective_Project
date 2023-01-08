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

exports.signup = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): any; new(): any; }; }; }) => {
    await fetch("http://localhost:3000/createUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
        redirect: 'follow'
    }).then((data) => data.json())
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error));
};

exports.signin = (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message?: any; accessToken?: any; id?: any; name?: any; email?: any; role?: string; }): void; new(): any; }; }; }) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user: { password: any; id: any; roleId: any; name: any; email: any; }) => {
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
        Role.findByPk(user.roleId).then((role: { name: string; }) => {
            roleValue = "ROLE_" + role.name.toUpperCase();
            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                role: roleValue,
                accessToken: token
            });
        });
    }).catch((err: { message: any; }) => {
        res.status(500).send({ message: err.message });
    });
};
