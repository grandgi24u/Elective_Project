// @ts-ignore
const controller = require("../controllers/user.controller");
module.exports = function(app) {
    app.post("/createUser", controller.createUser);
    app.delete("/deleteUser/:id", controller.deleteUser);
    app.patch("/updateUser/:id", controller.updateUser);
    app.get("/getUser/:id", controller.getUser);
    app.get("/getUsers", controller.getUsers);
};
