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
router.get('/:idHistory', controller.getHistoryOrderById);
router.get('/:userid', controller.getHistoryOrderByUserId);
router.get('/:restaurantId', controller.getHistoryOrderByRestaurantId);

module.exports = router;