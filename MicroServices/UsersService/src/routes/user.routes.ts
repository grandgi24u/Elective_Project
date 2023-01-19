// @ts-ignore
const controller = require("../controllers/user.controller");
// @ts-ignore
const { checkData } = require("../middleware");
// @ts-ignore
const cors = require('cors')

module.exports = function(app) {
    app.post("/createUser", checkData.checkIfEmailExist, checkData.checkRoleId, controller.createUser);
    app.delete("/deleteUser/:id", checkData.checkIfUserExist, controller.deleteUser);
    app.patch("/updateUser/:id", checkData.checkIfUserExist, controller.updateUser);
    app.get("/getUser/:id", checkData.checkIfUserExist, controller.getUser);
    app.get("/getUsers", controller.getUsers);
    app.post("/updateStatus/:id", controller.updateStatus);
    app.get("/search", controller.searchForUsers);
};
