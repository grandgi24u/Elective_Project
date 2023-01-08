// @ts-ignore
const controller = require("../controllers/user.controller");
// @ts-ignore
const { checkData, origin } = require("../middleware");
// @ts-ignore
const cors = require('cors')

module.exports = function(app) {
    app.post("/createUser", cors(origin), checkData.checkIfEmailExist, checkData.checkRoleId, controller.createUser);
    app.delete("/deleteUser/:id", cors(origin), checkData.checkIfUserExist, controller.deleteUser);
    app.patch("/updateUser/:id", cors(origin), checkData.checkIfUserExist, controller.updateUser);
    app.get("/getUser/:id", cors(origin), checkData.checkIfUserExist, controller.getUser);
    app.get("/getUsers", cors(origin), controller.getUsers);
};
