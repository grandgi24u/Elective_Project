// @ts-ignore
const controller = require('../controllers/item.controller');
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const checkData = require('../middleware/checkData');

router.get('/', checkData.checkIfRestaurantExist, controller.getItems);
router.get('/:idItem',checkData.checkIfRestaurantExist, checkData.checkIfItemExist, controller.getItem)
router.post('/', controller.createItem);
router.delete('/:idItem', checkData.checkIfRestaurantExist, checkData.checkIfItemExist, controller.deleteItem);
router.patch('/:idItem', checkData.checkIfRestaurantExist, checkData.checkIfItemExist, controller.updateAnItem);

module.exports = router;