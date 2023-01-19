// @ts-ignore
const controller = require("../controllers/order.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const itemRoute = require("./item.routes");
// @ts-ignore
const menuRoute = require("./menu.routes");
// @ts-ignore
const checkAllData = require('../middleware/checkAllData');

router.get('/', controller.getOrders);
router.get('/getNumberOrder', controller.getNumberOrder);
router.get('/getNumberOrder/getByStatus/:order_status', controller.getNumberOrderByStatus);
router.get('/:id',  checkAllData.checkIfOrderExist, controller.getOrder)
router.get('/getByIdRestaurant/:restaurantId/getByStatus/:order_status', controller.getOrderByRestaurantIdAndByStatus);
router.get('/getByStatus/:order_status', controller.getOrderByStatus);
router.get('/getDeliveryOrder/:idDelivery', controller.getDeliveryOrder);
router.post('/:id/assignDelivery/:idDelivery', controller.assignDelivery);
router.post('/',    controller.createOrder);
router.delete('/:id',  checkAllData.checkIfOrderExist, controller.deleteOrder);
router.patch('/:id', checkAllData.checkIfOrderExist, checkAllData.checkStatusOrder, controller.updateOrderStatus);
router.patch('/price/:id/', checkAllData.checkIfOrderExist, controller.updateOrderPrice);

router.use('/:id/item', itemRoute);
router.use('/:id/menu', menuRoute);

module.exports = router;