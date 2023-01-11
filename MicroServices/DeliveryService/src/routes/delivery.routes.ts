// @ts-ignore
const controller = require("../controller/delivery.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });

router.get('/', controller.getDeliverys);
router.get('/:id',  controller.getDelivery)
router.post('/', controller.createDelivery);
router.delete('/:id',  controller.deleteDelivery);

module.exports = router;