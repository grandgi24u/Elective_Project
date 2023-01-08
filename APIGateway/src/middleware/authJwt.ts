// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req: { headers: { [x: string]: any; }; userId: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): any; new(): any; }; }; }, next: () => void) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "Aucun token fourni !"
        });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err: any, decoded: { id: any; }) => {
        if (err) {
            return res.status(401).send({
                message: "Accès refusé : token invalide !"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isCustomer = (req: { userId: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }, next: () => void) => {
    User.findByPk(req.userId).then((user: { getRole: () => Promise<{ name: string; }>; }) => {
        user.getRole().then((role: { name: string; }) => {
            if (role.name === "customer") {
                next();
                return;
            }
            res.status(403).send({
                message: "Accès refusé : vous n'êtes pas customer !"
            });
            return;
        });
    });
}

const isRestaurant = (req: { userId: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }, next: () => void) => {
    User.findByPk(req.userId).then((user: { getRole: () => Promise<{ name: string; }>; }) => {
        user.getRole().then((role: { name: string; }) => {
            if (role.name === "restaurant") {
                next();
                return;
            }
            res.status(403).send({
                message: "Accès refusé : vous n'êtes pas un restaurateur !"
            });
            return;
        });
    });
}

const isDelivery = (req: { userId: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }, next: () => void) => {
    User.findByPk(req.userId).then((user: { getRole: () => Promise<any>; }) => {
        user.getRole().then(role => {
            if (role.name === "delivery") {
                next();
                return;
            }
            res.status(403).send({
                message: "Accès refusé : vous n'êtes pas un livreur !"
            });
            return;
        });
    });
}

// @ts-ignore
const authJwt = {
    verifyToken: verifyToken,
    isCustomer: isCustomer,
    isRestaurant: isRestaurant,
    isDelivery: isDelivery
};

module.exports = authJwt;
