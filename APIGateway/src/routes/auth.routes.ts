// @ts-ignore
const controller = require("../controllers/auth.controller");

module.exports = (app: { use: (arg0: (req: any, res: any, next: any) => void) => void; post: (arg0: string, arg1: any) => void; }) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/signup", controller.signup);
    app.post("/signin", controller.signin);
};