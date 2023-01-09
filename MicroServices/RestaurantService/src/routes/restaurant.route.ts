// @ts-ignore
const controller = require("../controllers/restaurant.controller");
const express = require('express');
const router = express.Router();

router.get('/', controller.getRestaurant);
router.post('/', controller.createRestaurant);
router.delete('/:id',  controller.deleteRestaurant);

module.exports = router;