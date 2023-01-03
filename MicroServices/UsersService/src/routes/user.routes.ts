// @ts-ignore
const { authJwt } = require("../middleware");
// @ts-ignore
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/all", controller.allAccess);
    app.get(
        "/customer",
        [authJwt.verifyToken],
        controller.customerBoard
    );
    app.get(
        "/restaurant",
        [authJwt.verifyToken, authJwt.isRestaurant],
        controller.restaurantBoard
    );
    app.get(
        "/delivery",
        [authJwt.verifyToken, authJwt.isDelivery],
        controller.deliveryBoard
    );
};
