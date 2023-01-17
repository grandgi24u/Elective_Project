// @ts-ignore
const controller = require("../controllers/history.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const itemRoute = require("./item.routes");
// @ts-ignore
const menuRoute = require("./menu.routes");
// @ts-ignore
const orderRoute = require("./order.routes");
// @ts-ignore
const checkAllData = require('../middleware/checkAllData');

router.get('/', controller.getHistoriesOrders);
router.get('/get100', controller.get100LastHistoriesOrders);
router.get('/:idHistory', controller.getHistoryOrderById);
router.get('/getByIdUser/:idUser', controller.getHistoryOrderByUserId);
router.get('/getByIdRestaurant/:restaurantId', controller.getHistoryOrderByRestaurantId);

module.exports = router;