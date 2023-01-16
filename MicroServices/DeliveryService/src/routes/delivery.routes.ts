// @ts-ignore
const controller = require("../controller/delivery.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const checkData = require('../middleware/checkData');

router.get('/', controller.getDeliveries);
router.get('/:id', controller.getDelivery)
router.post('/createDelivery', checkData.checkIfUserIdExist, controller.createDelivery);
router.delete('/:id', controller.deleteDelivery);
router.patch('/:id', controller.updateDelivery);
router.post('/:id/addOrder', controller.addOrder);
router.delete('/:id/deleteOrder', controller.deleteOrder);
router.post('/:id/addOrderFinished', controller.addOrderFinished);
router.delete('/:id/deleteOrderFinished', controller.deleteOrderFinished);

module.exports = router;