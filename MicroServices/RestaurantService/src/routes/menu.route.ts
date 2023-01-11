// @ts-ignore
import ItemRoute from "./item.route";

const controller = require('../controllers/menu.controller');
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const checkData = require('../middleware/checkData');
// @ts-ignore
const Item = require('../controllers/item.controller');

router.get('/', checkData.checkIfRestaurantExist, controller.getMenus);
router.get('/:idMenu',checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, controller.getMenu)
router.post('/', controller.createMenu);
router.delete('/:idMenu', checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, controller.deleteMenu);
router.patch('/:idMenu', checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, controller.updateAnMenu);

router.post('/:idMenu/item_optional/:idItem',checkData.checkIfRestaurantExist, checkData.checkIfMenuExist,checkData.checkIfItemBind, Item.createItem)
router.post('/:idMenu/item_required/:idItem',checkData.checkIfRestaurantExist, checkData.checkIfMenuExist,checkData.checkIfItemBind, Item.createItem)

router.post('/:idMenu/required_item/:idItem',checkData.checkIfRestaurantExist, checkData.checkIfMenuExist,checkData.checkIfItemExist, checkData.checkIfItemBind, controller.bindRequiredItem);
router.post('/:idMenu/optional_item/:idItem',checkData.checkIfRestaurantExist, checkData.checkIfMenuExist,checkData.checkIfItemExist, checkData.checkIfItemBind, controller.bindOptionalItem);

module.exports = router;