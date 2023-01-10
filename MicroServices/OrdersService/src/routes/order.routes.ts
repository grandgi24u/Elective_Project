// @ts-ignore
const controller = require("../controllers/order.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const itemRoute = require("./item.routes");

router.get('/', controller.getOrders);
router.get('/:id',  controller.getOrder)
router.post('/', controller.createOrder);
router.delete('/:id',  controller.deleteOrder);

router.use('/:id/item', itemRoute);

module.exports = router;