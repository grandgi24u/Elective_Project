// @ts-ignore
const controller = require("../controllers/restaurant.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router();
// @ts-ignore
const MenuRoute = require('./menu.route');

router.get('/', controller.getRestaurants);
router.get('/:id',  controller.getRestaurant)
router.post('/', controller.createRestaurant);
router.delete('/:id',  controller.deleteRestaurant);

router.use('/:id/menu', MenuRoute);

module.exports = router;