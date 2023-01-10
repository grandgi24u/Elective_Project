// @ts-ignore
const controller = require('../controllers/menu.controller');
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const MenuRoute = require('./menu.route');
// @ts-ignore
const checkData = require('../middleware/checkData');

router.get('/', checkData.checkIfRestaurantExist, controller.getMenus);
router.get('/:idMenu',checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, controller.getMenu)
router.post('/', controller.createMenu);
router.delete('/:idMenu', checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, controller.deleteMenu);
router.patch('/:idMenu', checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, controller.updateAnMenu);

module.exports = router;