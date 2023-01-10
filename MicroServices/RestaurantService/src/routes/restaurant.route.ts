// @ts-ignore
const controller = require("../controllers/restaurant.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const MenuRoute = require('./menu.route');
// @ts-ignore
const checkData = require('../middleware/checkData');

router.get('/', controller.getRestaurants);
router.get('/:id', checkData.checkIfRestaurantExist, controller.getRestaurant)
router.post('/', controller.createRestaurant);
router.delete('/:id', checkData.checkIfRestaurantExist, controller.deleteRestaurant);

router.use('/:id/menu', MenuRoute);

module.exports = router;